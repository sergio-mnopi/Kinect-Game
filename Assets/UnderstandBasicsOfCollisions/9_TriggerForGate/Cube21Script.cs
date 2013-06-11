// Cube21Script.cs
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 
// 

using UnityEngine;
using System.Collections;

public class Cube21Script : MonoBehaviour {

	private GameObject cube1Text;
	private TextMesh tmesh;
	// for open/close door
	private int doorState=0;
	private GameObject pivot;
	
	//------------------------------------------------------------
	// Use this for initialization
	void Start () {
		cube1Text = GameObject.Find("CubeText");
		tmesh = cube1Text.GetComponent<TextMesh>();
		//get pivot door
		pivot = GameObject.Find("pivot");
	}
	

	//------------------------------------------------------------
	// Update is called once per frame
	// open/close gate sequence
	void Update () {
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
	void OnTriggerEnter (Collider collision) {
		if(collision.gameObject.name.Contains("Cube1"))	{
			tmesh.text = "enter the Trigger=open door";
			doorState=1;
		}
	}

	//------------------------------------------------------------
	// exit trigger detection
	void OnTriggerExit (Collider collision) {

		if(collision.gameObject.name.Contains("Cube1"))	{
			tmesh.text = "exit the Trigger=close door";
			doorState=-1;
		}
	}	
}
