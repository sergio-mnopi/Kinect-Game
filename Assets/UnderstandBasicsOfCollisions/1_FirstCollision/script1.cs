// script1.cs
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

public class script1 : MonoBehaviour {
	
	// flag for move object
	private bool objectmove=true;
	
	//-----------------------------------------------------
	// Use this for initialization
	void Start () {
	
	}
	
	//-----------------------------------------------------
	// Update is called once per frame
	// move our cube
	void Update () {
		if(objectmove)	rigidbody.transform.Translate(-0.05f,0,0);
	}
	
	//-----------------------------------------------------
	// collision enter callback
	// if collision detected, then stop move
	void OnCollisionEnter(Collision collision) {
		// if a collision is detected, stop object
		objectmove=false;
	}	

}
