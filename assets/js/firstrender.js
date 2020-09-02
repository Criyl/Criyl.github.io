var distancefromsubject = 5;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
camera.position.z = distancefromsubject ;
//camera.rotateOnAxis(new THREE.Vector3(0,1,0),1)

var renderer = new THREE.WebGLRenderer({ alpha: true ,antialias:true} );
renderer.setClearAlpha(0)

var geometry = new THREE.BoxGeometry();

var material = new THREE.MeshLambertMaterial( { color: 0xFF0000} );
var cube1 = new THREE.Mesh( geometry, material );

var transformation = new THREE.Matrix4();
transformation.set(
    1,0,0,2,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
)
transformation.scale(new THREE.Vector3(1,2,1))
cube1.applyMatrix4(transformation)
scene.add( cube1 );

material = new THREE.MeshLambertMaterial( { color: 0x0000FF} );
var cube2 = new THREE.Mesh( geometry, material );
scene.add( cube2);

material = new THREE.MeshLambertMaterial( { color: 0x00FF00} );
var cube3 = new THREE.Mesh( geometry, material );
cube3.position.add(new THREE.Vector3(-2,0,0));
scene.add( cube3);


geometry = new THREE.PlaneGeometry(10,10)
material = new THREE.MeshBasicMaterial( { color: 0xC6C6C6} );
var plane = new THREE.Mesh( geometry, material );
plane.rotateOnAxis(new THREE.Vector3(1,0,0),-Math.PI/2)
plane.position.add(new THREE.Vector3(0,-distancefromsubject+2 ,0));
scene.add( plane);

var lightcolor = 0xFFFFFF

var light = new THREE.PointLight(lightcolor,5,500);
light.position.set(0,2,0);
light.castShadow= true;
scene.add(light);

var lighthelper = new THREE.PointLightHelper(light,0.5,lightcolor)
scene.add(lighthelper)


var timedelta = 0.01;
var angle = 0;

function show(id){

    var area = document.getElementById(id);
    var width = area.clientWidth
    area.appendChild( renderer.domElement );

    renderer.setSize( width,width );
    var animate = function () {
        requestAnimationFrame( animate );
        if(light.position.distanceTo(new THREE.Vector3(0,0,0)) > 4.5)
            timedelta *= -1;
        light.position.add(new THREE.Vector3(timedelta,0,0))
        cube1.rotation.x += 0.01;
        cube3.rotation.y += 0.01;
        distancefromsubject -= timedelta


        angle += timedelta;
        camera.rotation.set(0,angle,0);

        var x = distancefromsubject *Math.cos(angle)
        var y = distancefromsubject *Math.sin(angle)

        camera.position.set(y,0,x)

        renderer.render( scene, camera );
    };
    animate();
}



