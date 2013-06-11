// Cube2Script.cs
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

public class Cube2Script : MonoBehaviour {
	
	private GameObject cube1Text;
	private TextMesh tmesh;
	
	// Use this for initialization
	void Start () {
		cube1Text = GameObject.Find("CubeText");
		tmesh = cube1Text.GetComponent<TextMesh>();		
	}
	
	//------------------------------------------------------------
	// enter trigger detection 
	void OnTriggerEnter (Collider other) {
		tmesh.text = "you just enter the Trigger";
	}

	//------------------------------------------------------------
	// exit trigger detection
	void OnTriggerExit (Collider other) {
		tmesh.text = "you just exit the Trigger";
	}	
	 
}
