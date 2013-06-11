// script2.cs
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

public class script2 : MonoBehaviour {

	//-----------------------------------------------------
	// Use this for initialization
	void Start () {
	
	}
	
	//-----------------------------------------------------
	// Update is called once per frame
	void Update () {
	
	}
	
	//-----------------------------------------------------
	// collision enter callback
	// if collision detected, change text3D
	void OnCollisionEnter(Collision collision) {
		
		// retrieve the gameobject attached to the collision
		GameObject obj = collision.gameObject;
		
		// change the text of the cube impacted
		string texCubeName = obj.name + "Text";
		GameObject txt = GameObject.Find(texCubeName);
		TextMesh tmesh = txt.GetComponent<TextMesh>();
		tmesh.text = "Collision/Stop";
	}	
}
