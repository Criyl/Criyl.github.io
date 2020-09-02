var distancefromsubject = 10;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 100 );
camera.position.z = distancefromsubject ;
//camera.rotateOnAxis(new THREE.Vector3(0,1,0),1)

var lightcolor = 0xFFFFFF

var light = new THREE.PointLight(lightcolor,10,20,2);
light.position.set(0,10,0);
light.castShadow = true;

scene.add(light);

light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5;       // default
light.shadow.camera.far = 500      // default

var renderer = new THREE.WebGLRenderer({ alpha: true ,antialias:true} );
renderer.setClearAlpha(0)
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

var geometry = new THREE.BoxGeometry();

var material = new THREE.MeshPhongMaterial( { color: 0xFF0000} );
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
cube1.castShadow = true;
cube1.receiveShadow = true;
scene.add( cube1 );

material = new THREE.MeshPhongMaterial( { color: 0x0000FF} );
var cube2 = new THREE.Mesh( geometry, material );
cube2.receiveShadow=true;
cube2.castShadow=true;
scene.add( cube2);


material = new THREE.MeshPhongMaterial( { color: 0x00FF00} );
var cube3 = new THREE.Mesh( geometry, material );
cube3.position.add(new THREE.Vector3(-2,0,0));
cube3.castShadow = true;
cube3.receiveShadow = true;
scene.add( cube3);


geometry = new THREE.PlaneGeometry(10,10)
material = new THREE.MeshPhongMaterial( { color: 0xC6C6C6} );
var plane = new THREE.Mesh( geometry, material );
plane.rotateOnAxis(new THREE.Vector3(1,0,0),-Math.PI/2)
plane.position.add(new THREE.Vector3(0,-4 ,0));
plane.castShadow = true;
plane.receiveShadow = true;
scene.add( plane);



var lighthelper = new THREE.PointLightHelper(light,0.5,lightcolor)
scene.add(lighthelper)


var timedelta = 0.1;
var angle = 0;

function show(id){

    var area = document.getElementById(id);
    var width = area.scrollWidth;
    area.appendChild( renderer.domElement );

    renderer.setSize( width,width );
    var animate = function () {
        requestAnimationFrame( animate );
        if(light.position.distanceTo(new THREE.Vector3(0,0,0)) > 11 )
            timedelta *= -1;
        light.position.add(new THREE.Vector3(1.5*timedelta,0,0))
        cube1.rotation.x += Math.abs(timedelta);
        cube3.rotation.y += Math.abs(timedelta);
        distancefromsubject -= 3*timedelta


        angle += timedelta;
        camera.rotation.set(0,angle,0);

        var x = distancefromsubject *Math.cos(angle)
        var y = distancefromsubject *Math.sin(angle)

        camera.position.set(y,0,x)

        renderer.render( scene, camera );
    };
    animate();
}



