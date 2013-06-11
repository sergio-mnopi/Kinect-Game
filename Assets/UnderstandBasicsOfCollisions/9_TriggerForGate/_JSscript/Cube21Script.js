// Cube21Script.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 

private var cube1Text: GameObject;
private var tmesh: TextMesh;
	// for open/close door
private var doorState: int=0;
private var pivot: GameObject;
	
	//------------------------------------------------------------
	// Use this for initialization
function Start () {
	cube1Text = GameObject.Find("CubeText");
	tmesh = cube1Text.GetComponent(TextMesh);
	//get pivot door
	pivot = GameObject.Find("pivot");
}

	//------------------------------------------------------------
	// Update is called once per frame
	// open/close gate sequence
function Update () {
		if( (doorState>0) && (doorState<90)) {
			pivot.transform.Rotate(0,8,0);
			doorState+=8;
		}
		if( (doorState<0) && (doorState>-90)) {
			pivot.transform.Rotate(0,-8,0);
			doorState-=8;
		}
}
	
	//------------------------------------------------------------
	// enter trigger detection 
function OnTriggerEnter (collision:Collider) {
		if(collision.gameObject.name.Contains("Cube1"))	{
			tmesh.text = "enter the Trigger=open door";
			doorState=1;
		}
}

	//------------------------------------------------------------
	// exit trigger detection
function OnTriggerExit (collision:Collider) {

		if(collision.gameObject.name.Contains("Cube1"))	{
			tmesh.text = "exit the Trigger=close door";
			doorState=-1;
		}
}	