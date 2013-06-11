// script2.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 


function Update () {
}

	//-----------------------------------------------------
	// collision enter callback
	// if collision detected, change text3D
function OnCollisionEnter(collision:Collision) {
		
		// retrieve the gameobject attached to the collision
		var obj:GameObject = collision.gameObject;
		
		// change the text of the cube impacted
		var texCubeName = obj.name + "Text";
		var txt:GameObject = GameObject.Find(texCubeName);
		var tmesh:TextMesh = txt.GetComponent(TextMesh);
		tmesh.text = "Collision/Stop";
	}	

