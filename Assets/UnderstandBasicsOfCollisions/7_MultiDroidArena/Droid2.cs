// Droid2.cs
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

public class Droid2 : MonoBehaviour {
	
	// LayerMask, the cube of the same color does not detect. 
	// There is only detecting the wall and cubes of another color.
	// see layer definition in the inspector.
	//
	// In our case, first LayerMask is '110.0000.0000' in Binary is '1536' in decimal (for green cubes)
	// and is '101.0000.0000' in Binary is '1280' in decimal (for yellow cubes)
	public int layerDetect;
	
	// private data
	private LineRenderer lineRenderer;
	private int collideDetect=0;
	private float rotateDir=1.0f;
	
	//------------------------------------------------------------
	// Use this for initialization
	void Start () {
		// init some linerenderer parameters
		lineRenderer = gameObject.AddComponent<LineRenderer>();
		lineRenderer.SetWidth(0.05f, 0.05f);
	}
	
	//------------------------------------------------------------
	// Update is called once per frame
	void Update () {
		
		// change of direction if a collision detected
		if(collideDetect!=0) {
			if(collideDetect<12) {
				transform.Translate(0,0,-0.05f);
				collideDetect+=1;
				if(Random.value>0.5f)
					rotateDir=1.0f;
				else
					rotateDir=-1.0f;
			}
			else {
				transform.Rotate(0,rotateDir,0);
				collideDetect+=1;
				if(collideDetect>80) collideDetect=0;				
			}
			
		}
		else{
		// move cube
			transform.Translate(0,0,0.05f);
		}
		
		
		// set LineRenderer position and detection
		lineRenderer.SetPosition(0, transform.position);
		Vector3 dir = transform.TransformDirection(Vector3.forward);
		lineRenderer.SetPosition(1, transform.position+dir*1.5f);			
		
		
		// RayCast obstacle detect
		// this time, we use the distance 'distance' and 'LayerMask' parameters inside
		// the RayCast function:
		RaycastHit hit;
		if (Physics.Raycast(transform.position, dir, out hit, 
		                    1.5f /* <- max distance of detection */, 
		                    layerDetect /*<- layerMask use for selective detection*/)) 
		{
			if(hit.collider.gameObject.name.Contains("Cube"))	
			{
				collideDetect=1;
			}
		}

	}
}
