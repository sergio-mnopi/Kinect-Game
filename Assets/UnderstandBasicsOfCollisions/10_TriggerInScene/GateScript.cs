// GateScript.cs
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

public class GateScript : MonoBehaviour {

	public GameObject pivot;
	
	// for open/close door
	private int doorState=0;

	
	//------------------------------------------------------------
	// Use this for initialization
	void Start () {
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

		if(collision.gameObject.tag == "Player")	{
			doorState=1;
		}
	}

	//------------------------------------------------------------
	// exit trigger detection
	void OnTriggerExit (Collider collision) {

		if(collision.gameObject.tag == "Player")	{
			doorState=-1;
		}
	}	
}
