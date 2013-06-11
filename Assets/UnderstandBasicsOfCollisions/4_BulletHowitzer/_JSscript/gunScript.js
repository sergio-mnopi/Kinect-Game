// gunScript.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 

// the gun for fire
public var gun: GameObject;
public var powershot: GUIText;
	
// private data
private var bullet: GameObject=null;
private var power: float;
	
	//------------------------------------------------------------
	// Use this for initialization
function Start () {
	bullet = GameObject.Find("bullet");
	powershot.text = "powerShot = 0";		
}

	//------------------------------------------------------------
	// Update is called once per frame
	// control of gun
function Update () {
		// control of gun, just little rotatation left/right
		if( Input.GetKey(KeyCode.LeftArrow)) transform.Rotate(0,-0.5f,0);
		if( Input.GetKey(KeyCode.RightArrow)) transform.Rotate(0,0.5f,0);			
		if( Input.GetKey(KeyCode.UpArrow)) transform.Rotate(0.5f,0,0);
		if( Input.GetKey(KeyCode.DownArrow)) transform.Rotate(-0.5f,0,0);
		
		// power of shot
		if( Input.GetKey("space") ) {
			power +=0.5f;
			powershot.text = "powerShot = "+power;
		}
		
		// firing of the projectile
		if( Input.GetKeyUp("space") ) {
			var obj:GameObject = Instantiate(bullet, gun.transform.position, gun.transform.rotation) as GameObject;
			obj.rigidbody.velocity = gun.transform.TransformDirection(Vector3.forward * power);
			obj.name = "BulletClone";
			power=0.0f;
		}

}