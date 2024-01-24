import { LumaSplatsThree } from "@lumaai/luma-web";
import { Color, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, Texture, Vector3 } from "three";
import { DemoProps } from ".";
import useSpline from '@splinetool/r3f-spline'

export function DemoParticle(props: DemoProps) {
	let { renderer, camera, scene, gui } = props;
	const { nodes, materials } = useSpline('https://prod.spline.design/2fzdsSVagfszNxsd/scene.spline')


  return (
		<>
    <group {...props} dispose={null}>
      <mesh
        name="Rectangle"
        geometry={nodes.Rectangle.geometry}
        material={materials['Rectangle Material']}
      />
    </group>
  )

}
