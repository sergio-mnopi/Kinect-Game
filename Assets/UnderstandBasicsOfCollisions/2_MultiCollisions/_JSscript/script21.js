// script21.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 


public var txtMesh:TextMesh;
	
// flag for move object
private var objectmove:int=0;

	//------------------------------------------------------------
	// Update is called once per frame
	// different phase move of the cube
function Update () {
		switch(objectmove)	{
			// move phase
		case 0: 	rigidbody.transform.Translate(-0.05f,0,0);
					break;
			// back and rotate phase when collide
		case 1:		rigidbody.transform.Translate(2.5f,0,0);
					rigidbody.transform.Rotate(0,22,0, Space.Self);
					objectmove=0;
					break;
		}
		// set zero rotation for 3DText for better view
		txtMesh.transform.rotation = Quaternion.identity;
}

	//------------------------------------------------------------
	// collision enter callback
	// detection over all cubes
function OnCollisionEnter(collision:Collision) {
		// if a collision is detected with cube 
		if(collision.gameObject.name.Contains("Cube8"))	{
			objectmove=2;
			txtMesh.text = "Collide with "+collision.gameObject.name+" and stop";
			collision.gameObject.renderer.material.color = Color(1,0.15f,0,1);
		}
		else {
			if(collision.gameObject.name.Contains("Cube"))	{
				objectmove=1;
				txtMesh.text = "Collide with "+collision.gameObject.name;
				collision.gameObject.renderer.material.color = Color(1,0.15f,0,1);
			}
		}
	}	
