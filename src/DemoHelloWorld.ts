import { LumaSplatsSemantics, LumaSplatsThree } from "@lumaai/luma-web";
import { DemoProps } from ".";
import { loadEnvironment } from "./util/Environment";
import { Color, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, Texture, Vector3 } from "three";


export function DemoHelloWorld(props: DemoProps) {
	let { renderer, scene, gui } = props;

	let splats = new LumaSplatsThree({
		// Jules Desbois La Femme à l’arc @HouseofJJD
		source: 'https://lumalabs.ai/capture/7e6c2f5c-0950-4fc8-b6c5-a7e4019bae01',
		enableThreeShaderIntegration: false,
	});

	scene.add(splats);
	
	let layersEnabled = {
		Background: false,
		Foreground: true,
	}

	function updateSemanticMask() {
		splats.semanticsMask =
			(layersEnabled.Background ? LumaSplatsSemantics.BACKGROUND : 0) |
			(layersEnabled.Foreground ? LumaSplatsSemantics.FOREGROUND : 0);
	}

	updateSemanticMask();

	gui.add(layersEnabled, 'Background').onChange(updateSemanticMask);

	loadEnvironment(renderer, scene, 'assets/venice_sunset_1k.hdr');
	scene.add(createText());
	return {
		dispose: () => {
			splats.dispose();
		}
	}
}


// create a plane with "Hello World" text
function createText() {
	// create canvas
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d')!;
	canvas.width = 1024;
	canvas.height = 512;

	// clear white, 0 alpha
	context.fillStyle = 'rgba(255, 255, 255, 0)';
	context.fillRect(0, 0, canvas.width, canvas.height);

	// draw text
	context.fillStyle = 'white';
	// 100px helvetica, arial, sans-serif
	context.font = '200px sans-serif';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	// stroke
	context.strokeStyle = 'rgba(0, 0, 0, 0.5)'
	context.lineWidth = 5;
	context.fillText('click!', canvas.width / 2, canvas.height / 2);
	context.strokeText('click!', canvas.width / 2, canvas.height / 2);

	// create texture from canvas
	const texture = new Texture(canvas);
	texture.needsUpdate = true;

	// create plane geometry and mesh with the texture
	const geometry = new PlaneGeometry(5, 2.5);
	const material = new MeshStandardMaterial({
		map: texture,
		transparent: false,
		alphaTest: 0.5,
		side: DoubleSide,
		premultipliedAlpha: true,
		emissive: 'white',
		emissiveIntensity: 2,
	});
	const textPlane = new Mesh(geometry, material);

	// position and rotate
	textPlane.position.set(0.1, 1.3, 0);
	textPlane.rotation.y = Math.PI / 10;
	textPlane.scale.setScalar(0.6);

	return textPlane;
}