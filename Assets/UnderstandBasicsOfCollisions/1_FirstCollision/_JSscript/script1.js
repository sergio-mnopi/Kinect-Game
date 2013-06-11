// script1.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 


// flag for move object
private var objectmove : boolean = true;

	//-----------------------------------------------------
	// Update is called once per frame
	// move our cube
function Update () {
		if(objectmove)	rigidbody.transform.Translate(-0.05f,0,0);
}

	//-----------------------------------------------------
	// collision enter callback
	// if collision detected, then stop move
function OnCollisionEnter(collision:Collision) {
		// if a collision is detected, stop object
		objectmove=false;
	}	
