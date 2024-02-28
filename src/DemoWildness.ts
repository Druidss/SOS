import { LumaSplatsThree } from "@lumaai/luma-web";
import { Color, FogExp2 } from "three";
import { DemoProps } from '.';
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";



export function DemoWildness(props: DemoProps) {

    const { renderer, camera, scene, gui } = props;
    renderer.xr.enabled = true;

	let vrButton = VRButton.createButton(renderer);
	let canvas = renderer.getContext().canvas as HTMLCanvasElement;
	canvas.parentElement!.append(vrButton);

    scene.fog = new FogExp2(new Color(0xa8a8a8).convertLinearToSRGB(), 0.1);
    scene.background = scene.fog.color;

    let splats = new LumaSplatsThree({
        source: 'https://lumalabs.ai/capture/b5faf515-7932-4000-ab23-959fc43f0d94',
        loadingAnimationEnabled: false,
    });
    scene.add(splats);

    splats.onInitialCameraTransform = (transform) => {
        camera.matrix.copy(transform);
        camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);
        camera.updateMatrixWorld();
    };

    splats.onLoad = () => {
        // ...
    }

    gui.add(renderer, 'toneMappingExposure', 0, 10).name('Exposure');
    gui.add(scene.fog, 'density', 0, 0.3).name('Fog Density');
    gui.addColor(scene.fog, 'color').name('Fog Color');

    return {
        dispose: () => {
            splats.dispose();
        }
    };
}
