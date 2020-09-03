var distancetosubject=1000;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 2000 );
camera.position.z = distancetosubject;

var renderer = new THREE.WebGLRenderer({ alpha: true ,antialias:true} );
renderer.setClearAlpha(0)
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

//--lighting
var lightcolor = 0xFFFFFF

var light = new THREE.PointLight(lightcolor,10,2000,2);
light.position.set(0,1000,distancetosubject);
scene.add(light);

light.shadow.mapSize.width = 512*100;  // default
light.shadow.mapSize.height = 512*100; // default
light.shadow.camera.near = 0.5;       // default
light.shadow.camera.far = 5000      // default
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

var lighthelper = new THREE.PointLightHelper(light,200,lightcolor)
scene.add(lighthelper)
//--

var geometry = new THREE.PlaneGeometry(500,500)
var material = new THREE.MeshPhongMaterial( { color: 0xC6C6C6} );
var plane = new THREE.Mesh( geometry, material );
plane.castShadow = true;
plane.receiveShadow = true;
scene.add( plane);

var timedelta = 0.1;

window.onmousemove = getCursorXY;
var dimensions = [window.innerWidth,window.innerHeight]
var cursor = [-1,-1]
function getCursorXY(event) {
    cursor[0] = event.clientX;
    cursor[1] = event.clientY;
}

function showSecond(id){

    var area = document.getElementById(id);
    var width = area.scrollWidth;
    area.appendChild( renderer.domElement );
    renderer.setSize( width,width );


    var animate = function () {
        requestAnimationFrame( animate );
        areaRect = area.getBoundingClientRect();
        middle = [areaRect.x+areaRect.width/2,areaRect.y+areaRect.height/2]
        relativepos = [cursor[0]-middle[0],cursor[1]-middle[1]]
        document.getElementById("debugsecond").innerText = "("+(relativepos[0].toPrecision(3))+","+(relativepos[1].toPrecision(3))+") "+"\n timedelta: "+timedelta.toPrecision(3)
        plane.setRotationFromAxisAngle( new THREE.Vector3(0,1,0), Math.atan((relativepos[0])/distancetosubject))
        plane.rotateOnAxis( new THREE.Vector3(1,0,0), Math.atan((relativepos[1])/distancetosubject))

        renderer.render( scene, camera );
    };
    animate();
}



