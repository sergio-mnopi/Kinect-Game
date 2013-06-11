// initScene.cs
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

public class initScene : MonoBehaviour {
	
	public string presentation;
	
	// Use this for initialization
	void Start () {
	}
	
	void OnGUI() {
		
		 GUI.TextArea(new Rect(16, 16, 256, 128), presentation, 200);

	}
}
