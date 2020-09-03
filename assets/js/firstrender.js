

var timedelta = 0.1;
var angle = 0;
var count= 0;
var direction = 1;
var speed = 0.001;
var lasttime = performance.now()
function showFirst(id){

    var distancefromsubject = 1000;

    var firstscene = new THREE.Scene();

    var firstcamera = new THREE.PerspectiveCamera( 75, 1, 0.1, 10000 );
    firstcamera.position.z = distancefromsubject ;
//firstcamera.rotateOnAxis(new THREE.Vector3(0,1,0),1)

    var lightcolor = 0xFFFFFF

    var light = new THREE.PointLight(lightcolor,10,2000,2);
    light.position.set(0,1000,0);
    light.castShadow = true;

    firstscene.add(light);

    light.shadow.mapSize.width = 512*100;  // default
    light.shadow.mapSize.height = 512*100; // default
    light.shadow.camera.near = 0.5;       // default
    light.shadow.camera.far = 5000      // default

    var firstrenderer = new THREE.WebGLRenderer({ alpha: true ,antialias:true} );
    firstrenderer.setClearAlpha(0)
    firstrenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    firstrenderer.shadowMap.enabled = true;

    var geometry = new THREE.BoxGeometry(100,100,100);

    var material = new THREE.MeshPhongMaterial( { color: 0xFF0000} );
    var cube1 = new THREE.Mesh( geometry, material );

    var transformation = new THREE.Matrix4();
    transformation.set(
        1,0,0,200,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1
    )
    transformation.scale(new THREE.Vector3(1,2,1))
    cube1.applyMatrix4(transformation)
    cube1.castShadow = true;
    cube1.receiveShadow = true;
    firstscene.add( cube1 );

    material = new THREE.MeshPhongMaterial( { color: 0x0000FF} );
    var cube2 = new THREE.Mesh( geometry, material );
    cube2.receiveShadow=true;
    cube2.castShadow=true;
    firstscene.add( cube2);


    material = new THREE.MeshPhongMaterial( { color: 0x00FF00} );
    var cube3 = new THREE.Mesh( geometry, material );
    cube3.position.add(new THREE.Vector3(-200,0,0));
    cube3.castShadow = true;
    cube3.receiveShadow = true;
    firstscene.add( cube3);


    geometry = new THREE.PlaneGeometry(500,500)
    material = new THREE.MeshPhongMaterial( { color: 0xC6C6C6} );
    var firstplane = new THREE.Mesh( geometry, material );
    firstplane.rotateOnAxis(new THREE.Vector3(1,0,0),-Math.PI/2)
    firstplane.position.add(new THREE.Vector3(0,-400 ,0));
    firstplane.castShadow = true;
    firstplane.receiveShadow = true;
    firstscene.add( firstplane);



    var lighthelper = new THREE.PointLightHelper(light,0.5,lightcolor)
    firstscene.add(lighthelper)


    var firstarea = document.getElementById(id);
    var width = firstarea.scrollWidth;
    firstarea.appendChild( firstrenderer.domElement );

    firstrenderer.setSize( width,width );
    var animate = function () {
        requestAnimationFrame( animate );
        timedelta = (performance.now() - lasttime)*speed;
        lasttime = performance.now();


        if(Math.abs(count) > 30 ) {
			
			count = direction*30;
            direction *= -1;
        }
        count += direction*timedelta;

        document.getElementById("debugfirst").innerText = "count: "+count.toPrecision(3)+"\n timedelta: "+timedelta.toPrecision(3)
        cube1.rotation.x += Math.abs(timedelta);
        cube3.rotation.y += Math.abs(timedelta);
        distancefromsubject -= 3*direction*timedelta


        angle += direction*timedelta;
        firstcamera.rotation.set(0,angle,0);

        var x = distancefromsubject * Math.cos(angle)
        var y = distancefromsubject * Math.sin(angle)

        firstcamera.position.set(y,0,x)

        firstrenderer.render( firstscene, firstcamera );

    };
    animate();
}



