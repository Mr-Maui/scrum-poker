"""Assert security properties of the synthesized baseline, without AWS access."""

from pathlib import Path
from typing import Literal

import pytest
from aws_cdk import App
from aws_cdk.assertions import Match, Template
from scrumation_infra.config import StackConfig
from scrumation_infra.stack import ScrumationStack


@pytest.mark.parametrize("environment", ["dev", "prod"])
def test_asset_bucket_is_private_encrypted_and_retained(
    environment: Literal["dev", "prod"], tmp_path: Path
) -> None:
    app = App(outdir=str(tmp_path))
    stack = ScrumationStack(
        app, "Test", config=StackConfig(environment, "000000000000", "eu-west-1")
    )
    template = Template.from_stack(stack)
    template.resource_count_is("AWS::S3::Bucket", 1)
    template.has_resource(
        "AWS::S3::Bucket",
        {
            "DeletionPolicy": "Retain",
            "UpdateReplacePolicy": "Retain",
            "Properties": Match.object_like(
                {
                    "BucketEncryption": {
                        "ServerSideEncryptionConfiguration": [
                            {"ServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}
                        ]
                    },
                    "PublicAccessBlockConfiguration": {
                        "BlockPublicAcls": True,
                        "BlockPublicPolicy": True,
                        "IgnorePublicAcls": True,
                        "RestrictPublicBuckets": True,
                    },
                    "Tags": Match.array_with([{"Key": "Environment", "Value": environment}]),
                }
            ),
        },
    )
    template.has_resource_properties(
        "AWS::S3::BucketPolicy",
        {
            "PolicyDocument": {
                "Statement": Match.array_with(
                    [
                        Match.object_like(
                            {
                                "Effect": "Deny",
                                "Principal": {"AWS": "*"},
                                "Action": "s3:*",
                                "Condition": {"Bool": {"aws:SecureTransport": "false"}},
                            }
                        )
                    ]
                ),
                "Version": "2012-10-17",
            }
        },
    )


@pytest.mark.parametrize(
    ("environment", "account", "region", "message"),
    [
        ("unknown", "000000000000", "eu-west-1", "deploymentEnvironment"),
        ("dev", "", "eu-west-1", "awsAccount"),
        ("dev", "123", "eu-west-1", "awsAccount"),
        ("dev", "000000000000", "", "awsRegion"),
    ],
)
def test_invalid_target_is_rejected(
    environment: Literal["dev", "prod"], account: str, region: str, message: str
) -> None:
    with pytest.raises(ValueError, match=message):
        StackConfig(environment, account, region)
