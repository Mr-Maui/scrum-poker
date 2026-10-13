"""Minimal static asset storage baseline; delivery and API arrive in SP-003."""

from aws_cdk import Environment, RemovalPolicy, Stack, Tags
from aws_cdk import aws_s3 as s3
from constructs import Construct

from scrumation_infra.config import StackConfig


class ScrumationStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, *, config: StackConfig) -> None:
        super().__init__(
            scope,
            construct_id,
            env=Environment(account=config.account, region=config.region),
        )
        Tags.of(self).add("Project", "Scrumation")
        Tags.of(self).add("Environment", config.environment)

        s3.Bucket(
            self,
            "WebAssets",
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            encryption=s3.BucketEncryption.S3_MANAGED,
            enforce_ssl=True,
            removal_policy=RemovalPolicy.RETAIN,
        )
