"""ComfyUI custom nodes: real-location references from open sources (Panoramax, Photon).

Skeleton. Nodes are declared so ComfyUI can load the pack; network calls are implemented
in nodes.py and respect licences (photos with unknown rights are refused).
"""
from .nodes import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS"]
