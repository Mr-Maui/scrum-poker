"""CDK entry point. Call through the repository's pinned CDK CLI."""

from typing import Literal, cast

from aws_cdk import App

from scrumation_infra.config import StackConfig
from scrumation_infra.stack import ScrumationStack


def main() -> None:
    app = App()
    config = StackConfig(
        environment=cast(Literal["dev", "prod"], app.node.try_get_context("deploymentEnvironment")),
        account=str(app.node.try_get_context("awsAccount") or ""),
        region=str(app.node.try_get_context("awsRegion") or ""),
    )
    ScrumationStack(app, f"Scrumation-{config.environment}", config=config)
    app.synth()


if __name__ == "__main__":
    main()
