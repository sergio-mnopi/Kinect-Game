// gunScript1.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 


// the gun for fire
public var gun: GameObject;
	
// private data
private var bullet: GameObject=null;
	
	//------------------------------------------------------------
	// Use this for initialization
function Start () {
	bullet = GameObject.Find("bullet");
}

	//------------------------------------------------------------
	// Update is called once per frame
	// control of gun
function Update () {
		// control of gun, just little rotatation left/right
		if( Input.GetKey(KeyCode.LeftArrow)) transform.Rotate(0,-0.5f,0);
		if( Input.GetKey(KeyCode.RightArrow)) transform.Rotate(0,0.5f,0);
		if( Input.GetKey(KeyCode.UpArrow)) transform.Rotate(-0.5f,0,0);
		if( Input.GetKey(KeyCode.DownArrow)) transform.Rotate(0.5f,0,0);

		
		// firing of the projectile
		if( Input.GetKeyUp("space") ) {
			var obj:GameObject = Instantiate(bullet, gun.transform.position, gun.transform.rotation) as GameObject;
			obj.AddComponent(bulletScript1);
			obj.name = "BulletClone";
		}

}