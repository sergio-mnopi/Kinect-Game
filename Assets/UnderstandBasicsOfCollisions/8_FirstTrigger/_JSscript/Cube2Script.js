// Cube2Script.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 

private var cube1Text: GameObject;
private var tmesh: TextMesh;

	// Use this for initialization
function Start () {
		cube1Text = GameObject.Find("CubeText");
		tmesh = cube1Text.GetComponent(TextMesh);		
	}

function Update () {
}

	//------------------------------------------------------------
	// enter trigger detection 
function OnTriggerEnter ( other: Collider) {
		tmesh.text = "you just enter the Trigger";
}

	//------------------------------------------------------------
	// exit trigger detection
function OnTriggerExit ( other: Collider) {
		tmesh.text = "you just exit the Trigger";
}	
