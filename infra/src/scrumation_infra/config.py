"""Explicit deployment inputs; no implicit AWS credential environment."""

import re
from dataclasses import dataclass
from typing import Literal


@dataclass(frozen=True)
class StackConfig:
    environment: Literal["dev", "prod"]
    account: str
    region: str

    def __post_init__(self) -> None:
        if self.environment not in {"dev", "prod"}:
            raise ValueError("deploymentEnvironment must be dev or prod")
        if not re.fullmatch(r"[0-9]{12}", self.account):
            raise ValueError("awsAccount must be an explicit 12-digit account ID")
        if not re.fullmatch(r"[a-z]{2}(?:-[a-z]+)+-\d+", self.region):
            raise ValueError("awsRegion must be an explicit AWS region")
