import importlib.util, pathlib, unittest
spec = importlib.util.spec_from_file_location("nodes", pathlib.Path(__file__).parents[1] / "comfyui-real-location" / "nodes.py")
nodes = importlib.util.module_from_spec(spec); spec.loader.exec_module(nodes)

class T(unittest.TestCase):
    def test_unknown_licence_refused(self):
        fs = [{"properties": {"license": ""}}, {"properties": {}}, {"properties": {"license": "CC-BY-SA-4.0"}, "id": "ok"}]
        self.assertEqual(nodes.pick_reusable(fs)["id"], "ok")
        self.assertIsNone(nodes.pick_reusable(fs[:2]))
    def test_bbox(self):
        w, s, e, n = nodes.bbox_for(46.5, 6.6, 300)
        self.assertTrue(w < 6.6 < e and s < 46.5 < n)
    def test_mappings(self):
        self.assertEqual(set(nodes.NODE_CLASS_MAPPINGS), set(nodes.NODE_DISPLAY_NAME_MAPPINGS))

if __name__ == "__main__": unittest.main()
