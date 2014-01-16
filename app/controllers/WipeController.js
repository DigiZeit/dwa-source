//// ==========================================================================
//// The M-Project - Mobile HTML5 Application Framework
//// Generated with: Espresso 
////
//// Project: DigiWebApp
//// Controller: WipeController
//// ==========================================================================
//
//DigiWebApp.WipeController = M.Controller.extend({
//
//      wipeStartX: 0
//    , wipeStartY: 0
//    , wipeStopX: 0
//    , wipeStopY: 0
//    , wipeIsMoving: false
//    , wipeIsPressed: false
//    , wipeIsPressedStart: 0
//    , wipeIsPressedStop: 0
//    , wipeDecideX: 150
//    , wipeDecideY: 300
//    , wipeDecideTimeout: 200
//	
//	, wipeActionUp: function() {
//	}
//	
//	, wipeActionDown: function() {
//		if (
//				( M.ViewManager.currentPage.id !== DigiWebApp.TimeDataPage.id )
//			 && ( M.ViewManager.currentPage.id !== DigiWebApp.EditTimeDataPage.id )
//			 &&	( M.ViewManager.currentPage.id !== DigiWebApp.SettingsPage.id )
//			 &&	( M.ViewManager.currentPage.id !== DigiWebApp.CameraPage.id )
//			 &&	( M.ViewManager.currentPage.id !== DigiWebApp.EditPicturePage.id )
//			 &&	( M.ViewManager.currentPage.id !== DigiWebApp.MediaListPage.id )
//		){
//			try {
//				if ( (typeof(M.ViewManager.currentPage.header) !== "undefined") && (M.ViewManager.currentPage.header !== null) ) { 
//	  				if ( (typeof(M.ViewManager.currentPage.header.backButton) !== "undefined") && (M.ViewManager.currentPage.header.backButton !== null)) { 
//	  					if ( (typeof(M.ViewManager.currentPage.header.backButton.events) !== "undefined") && (M.ViewManager.currentPage.header.backButton.events !== null)) { 
//	  						if ( (typeof(M.ViewManager.currentPage.header.backButton.events.tap) !== "undefined") && (M.ViewManager.currentPage.header.backButton.events.tap !== null) ) {
//								if (typeof(M.ViewManager.currentPage.header.backButton.events.tap.action) === "function") {
//									M.ViewManager.currentPage.header.backButton.events.tap.action();					
//								} else {
//									M.ViewManager.currentPage.header.backButton.events.tap.target.get(M.ViewManager.currentPage.header.backButton.events.tap.action)();
//								}
//				}}}}
//			} catch(e) { console.log(e); }
//		}
//    }
//    
//	, wipeActionLeft: function() {
//			if ( M.ViewManager.currentPage.id === DigiWebApp.BookingPage.id ) {
//  				DigiWebApp.NavigationController.toDashboardPageFlipTransition();
//  			} else if ( M.ViewManager.currentPage.id === DigiWebApp.DashboardPage.id ){
//	  			DigiWebApp.NavigationController.backToBookTimePageFlipTransition();		  				
//  			} else {
//  				//console.log("else left");
//  			}
//    }
//    
//	, wipeActionRight: function() {
//		if ( M.ViewManager.currentPage.id === DigiWebApp.DashboardPage.id ) {
//			DigiWebApp.NavigationController.toBookTimePageFlipTransition();
//		} else if ( M.ViewManager.currentPage.id === DigiWebApp.BookingPage.id ){
//			DigiWebApp.NavigationController.backToDashboardPageFlipTransition();
//		} else {
//			//console.log("else right");
//			if (
//					( M.ViewManager.currentPage.id !== DigiWebApp.EditTimeDataPage.id )
//				 &&	( M.ViewManager.currentPage.id !== DigiWebApp.CameraPage.id )
//			){
//				try {
//					if ( (typeof(M.ViewManager.currentPage.header) !== "undefined") && (M.ViewManager.currentPage.header !== null) ) { 
//		  				if ( (typeof(M.ViewManager.currentPage.header.backButton) !== "undefined") && (M.ViewManager.currentPage.header.backButton !== null)) { 
//		  					if ( (typeof(M.ViewManager.currentPage.header.backButton.events) !== "undefined") && (M.ViewManager.currentPage.header.backButton.events !== null)) { 
//		  						if ( (typeof(M.ViewManager.currentPage.header.backButton.events.tap) !== "undefined") && (M.ViewManager.currentPage.header.backButton.events.tap !== null) ) {
//									if (typeof(M.ViewManager.currentPage.header.backButton.events.tap.action) === "function") {
//										M.ViewManager.currentPage.header.backButton.events.tap.action();					
//									} else {
//										M.ViewManager.currentPage.header.backButton.events.tap.target.get(M.ViewManager.currentPage.header.backButton.events.tap.action)();
//									}
//		  			}}}}
//				} catch(e) { console.log(e); }
//			}
//		}
//	}
//
//	, stopDefault: function(evt) {
//	    if ( navigator.userAgent.match(/Android/i) ) {
//	    	//evt.originalEvent.preventDefault();
//	    } else {
//		    if (evt && evt.preventDefault) {
//		        evt.preventDefault();
//		    }
//		    if (window.event && window.event.returnValue) {
//		        window.event.returnValue = false;
//		    }
//	    }
//	}
//	
//	, wipeDoStop: function(ev) {
//		var dx = DigiWebApp.WipeController.wipeStartX - DigiWebApp.WipeController.wipeStopX;
//		var dy = DigiWebApp.WipeController.wipeStartY - DigiWebApp.WipeController.wipeStopY;
//		var timeStart = DigiWebApp.WipeController.wipeIsPressedStart;
//		var timeStop  = DigiWebApp.WipeController.wipeIsPressedStop;
//		var dTime = timeStart - timeStop;
//		try { /*console.log("unbinding " + ev.type);*/ $(this).unbind(ev); } catch (e) { console.log("error while unbind"); }
//		_.each(DigiWebApp.app.pages, function(myPage) {
//			try { $('#' + myPage.id).unbind('touchmove', DigiWebApp.WipeController.wipeOnTouchMove); } catch (e) { console.log("error while unbind touchmove"); };
//			try { $('#' + myPage.id).unbind('mousemove', DigiWebApp.WipeController.wipeOnTouchMove); } catch (e) { console.log("error while unbind mousemove"); };
//			try { $('#' + myPage.id).unbind('touchmove'); } catch (e) { console.log("error while unbind touchmove"); };
//			try { $('#' + myPage.id).unbind('mousemove'); } catch (e) { console.log("error while unbind mousemove"); };
//			try { $('#' + myPage.id).unbind('touchstop', DigiWebApp.WipeController.wipeOnMoveStop); } catch (e) { console.log("error while unbind touchstop"); };
//			try { $('#' + myPage.id).unbind('mouseup',   DigiWebApp.WipeController.wipeOnMoveStop); } catch (e) { console.log("error while unbind mouseup"); };
//			try { $('#' + myPage.id).unbind('touchstop'); } catch (e) { console.log("error while unbind touchstop"); };
//			try { $('#' + myPage.id).unbind('mouseup');   } catch (e) { console.log("error while unbind mouseup"); };
//		});
//		var dxIsLongEnough = (Math.abs(dx) >= DigiWebApp.WipeController.wipeDecideX);
//		var dyIsLongEnough = (Math.abs(dy) >= DigiWebApp.WipeController.wipeDecideY);
//		var wipeBelowTimeout = (dTime < DigiWebApp.WipeController.wipeDecideTimeout);
//		var noInitialStopX = (DigiWebApp.WipeController.wipeStopX > 0);
//		var noInitialStopY = (DigiWebApp.WipeController.wipeStopY > 0);
//		//console.log("dxIsLongEnough: " + dxIsLongEnough);
//		//console.log("dyIsLongEnough: " + dyIsLongEnough);
//		//console.log("wipeBelowTimeout: " + wipeBelowTimeout);
//		//console.log("noInitialStopX: " + noInitialStopX);
//		//console.log("noInitialStopY: " + noInitialStopY);
//		if (DigiWebApp.WipeController.wipeIsMoving) {
//			if (wipeBelowTimeout) {
//				if ((dxIsLongEnough || dyIsLongEnough) 
//				&& (noInitialStopX && noInitialStopY)
//				){
//					if (dxIsLongEnough) {
//						if(dx > 0) {
//							console.log("wipe left");
//							//console.log(((DigiWebApp.WipeController.wipeStopX > 0) && (DigiWebApp.WipeController.wipeStopY > 0)));
//							//console.log("dx=" + dx + ", dy=" + dy + ", " + DigiWebApp.WipeController.wipeStopX + ", " + DigiWebApp.WipeController.wipeStopY);
//				  			DigiWebApp.WipeController.wipeActionLeft();
//						} else {
//							console.log("wipe right");
//				  			DigiWebApp.WipeController.wipeActionRight();
//						}
//					}
//					if (dyIsLongEnough) {
//						if(dy > 0) {
//				  			console.log("wipe up");
//		    				DigiWebApp.WipeController.wipeActionUp();
//		    			} else {
//				  			console.log("wipe down");
//		    				DigiWebApp.WipeController.wipeActionDown();
//		    			}
//					}
//					DigiWebApp.WipeController.stopDefault(ev);
//					return false;
//				} else {
//					//console.log("wipe too short");				
//				}
//			} else {
//				//console.log("scroll");
//			}
//		}
//		//console.log("reset touchstats");
//		DigiWebApp.WipeController.wipeIsPressed = false;
//		DigiWebApp.WipeController.wipeIsPressedStop = 0;
//		DigiWebApp.WipeController.wipeIsPressedStart = 0;
//		DigiWebApp.WipeController.wipeStartX = 0;
//		DigiWebApp.WipeController.wipeStartY = 0;
//		DigiWebApp.WipeController.wipeStopX = 0;
//		DigiWebApp.WipeController.wipeStopY = 0;
//		DigiWebApp.WipeController.wipeIsMoving = false;
//    }
//    
//    , wipeOnMoveStop: function(ev) {
//		/*
//    	var dx = DigiWebApp.WipeController.wipeStartX - DigiWebApp.WipeController.wipeStopX;
//		var dy = DigiWebApp.WipeController.wipeStartY - DigiWebApp.WipeController.wipeStopY;
//		var timeStart = DigiWebApp.WipeController.wipeIsPressedStart;
//		var timeStop  = DigiWebApp.WipeController.wipeIsPressedStop;
//		var dTime = timeStart - timeStop;
//    	console.log("wipeOnMoveStop: " + DigiWebApp.WipeController.wipeIsMoving + " (" + dx + ", " + dy + ") " + dTime);
//    	*/
//		try { /*console.log("unbinding " + ev.type);*/ $(this).unbind(ev); } catch (e) { console.log("error while unbind"); }
//		DigiWebApp.WipeController.wipeDoStop(ev);
//	}
//	
//	, wipeOnTouchStart: function(ev) {
//		
//	}
//	
//	, touchMoveEventSaved: null
//	, touchStartEventSaved: null
//	
//	, wipeOnTouchMove: function(ev) {
//		DigiWebApp.WipeController.touchMoveEventSaved = ev;
//		//try {
//			var x = 0;
//			var y = 0;
//	        if (typeof(ev.touches) !== "undefined") {
//	        	//console.log("touchmove: using ev.touches[0].page...");
//			  	x = ev.touches[0].pageX;
//			  	y = ev.touches[0].pageY;
//	        } else if ( typeof(ev.originalEvent.touches) !== "undefined" ) {
//	        	//console.log("touchmove: using ev.originalEvent.touches[0].page...");
//			  	x = ev.originalEvent.touches[0].pageX;
//			  	y = ev.originalEvent.touches[0].pageY;
//	        } else if ( typeof(ev.originalEvent) !== "undefined" ) {
//	        	//console.log("touchmove: using ev.originalEvent.page...");
//			  	x = ev.originalEvent.pageX;
//			  	y = ev.originalEvent.pageY;
//	        } else {
//	        	//console.log("touchmove: using ev.page...");
//	        	x = ev.pageX;
//	        	y = ev.pageY;
//	        }
//	        var xMoveSinceLastEvent = Math.abs(Math.abs(DigiWebApp.WipeController.wipeStopX) - x); 
//	        var yMoveSinceLastEvent = Math.abs(Math.abs(DigiWebApp.WipeController.wipeStopY) - y);
//	        var enoughMovement = ((xMoveSinceLastEvent < 200) && (yMoveSinceLastEvent < 200));
//	        /*
//	        console.log("xMoveSinceLastEvent=" + xMoveSinceLastEvent);
//	        console.log("yMoveSinceLastEvent=" + yMoveSinceLastEvent);
//	        console.log("DigiWebApp.WipeController.wipeStartX: " + DigiWebApp.WipeController.wipeStartX);
//	        console.log("DigiWebApp.WipeController.wipeStartY: " + DigiWebApp.WipeController.wipeStartY);
//	        console.log("DigiWebApp.WipeController.wipeStopX: " + DigiWebApp.WipeController.wipeStopX);
//	        console.log("DigiWebApp.WipeController.wipeStopY: " + DigiWebApp.WipeController.wipeStopY);
//	        console.log("enoughMovement=" + enoughMovement);
//	        */
//	        if ((enoughMovement && (x > 0) && (y > 0)) 
//	        || ((DigiWebApp.WipeController.wipeStopX === 0) && (DigiWebApp.WipeController.wipeStopY === 0))
//	        ) {
//		        DigiWebApp.WipeController.wipeStopX = x;
//		        DigiWebApp.WipeController.wipeStopY = y;
//		        DigiWebApp.WipeController.wipeIsPressedStop = (+new Date()).toString();
//				var dx = DigiWebApp.WipeController.wipeStartX - x;
//			  	var dy = DigiWebApp.WipeController.wipeStartY - y;
//		        var timeStart = DigiWebApp.WipeController.wipeIsPressedStart;
//				var timeStop  = DigiWebApp.WipeController.wipeIsPressedStop;
//				var dTime = timeStart - timeStop;
//			  	if ( (Math.abs(dx) > 10) || (Math.abs(dy) > 10)) {
//			  		DigiWebApp.WipeController.wipeIsMoving = true;
//			  	} else {
//			  		DigiWebApp.WipeController.wipeIsMoving = false;
//			  	}
//				var dxIsLongEnough = (Math.abs(dx) >= DigiWebApp.WipeController.wipeDecideX);
//				var dyIsLongEnough = (Math.abs(dy) >= DigiWebApp.WipeController.wipeDecideY);
//				var wipeTimeout = (dTime >= DigiWebApp.WipeController.wipeDecideTimeout);
//				//console.log("dx: " + dx);
//				//console.log("dy: " + dy);
//				//console.log("dxIsLongEnough: " + dxIsLongEnough);
//				//console.log("dyIsLongEnough: " + dyIsLongEnough);
//				//console.log("wipeTimeout: " + wipeTimeout);
//				if (( dxIsLongEnough || dyIsLongEnough || wipeTimeout) && (DigiWebApp.WipeController.wipeIsMoving)) {
//			    	//console.log("stopping wipe: " + DigiWebApp.WipeController.wipeIsMoving + " (" + dx + ", " + dy + ") " + dTime);
//					try { /*console.log("unbinding " + ev.type);*/ $(this).unbind(ev); } catch (e) { console.log("error while unbind"); }
//			  		if (typeof(device) !== "undefined") {
//			  			if ( 
//			  					( device.version.substr(0,1) >= 4 ) && ( device.platform.substr(0,7) >= "Android" ) && (DigiWebApp.SettingsController.globalDebugMode) )
//			  			{
//			  				DigiWebApp.WipeController.stopDefault(ev);
//			  			}
//			  		}
//					DigiWebApp.WipeController.wipeDoStop(ev);
//				};
//				//return false;
//	        } else {
//	        	console.log("blocked wipe");
//	        	//console.log("x=" + x + ", y=" + y + " " + DigiWebApp.WipeController.wipeStartX + ", " + DigiWebApp.WipeController.wipeStartY + " " + DigiWebApp.WipeController.wipeStopX + ", " + DigiWebApp.WipeController.wipeStopY);
//	    		DigiWebApp.WipeController.wipeIsPressed = false;
//	    		DigiWebApp.WipeController.wipeIsPressedStop = 0;
//	    		DigiWebApp.WipeController.wipeIsPressedStart = 0;
//	    		DigiWebApp.WipeController.wipeStartX = 0;
//	    		DigiWebApp.WipeController.wipeStartY = 0;
//	    		DigiWebApp.WipeController.wipeStopX = 0;
//	    		DigiWebApp.WipeController.wipeStopY = 0;
//	    		DigiWebApp.WipeController.wipeIsMoving = false;
//	        	try { /*console.log("unbinding " + ev.type);*/ $(this).unbind(ev); } catch (e) { console.log("error while unbind"); }
//	        	DigiWebApp.WipeController.wipeDoStop(ev);
//	        }
//		//} catch (e) { console.log(e); }
//	}
//	
//	, regTouchStart: function(pageid,ev) {
//		DigiWebApp.WipeController.wipeIsPressed = false;
//		DigiWebApp.WipeController.wipeIsPressedStop = 0;
//		DigiWebApp.WipeController.wipeIsPressedStart = 0;
//		DigiWebApp.WipeController.wipeStartX = 0;
//		DigiWebApp.WipeController.wipeStartY = 0;
//		DigiWebApp.WipeController.wipeStopX = 0;
//		DigiWebApp.WipeController.wipeStopY = 0;
//		DigiWebApp.WipeController.wipeIsMoving = false;
//		DigiWebApp.WipeController.touchStartEventSaved = ev;
//		if( navigator.userAgent.match(/Android/i) ) {
//			//console.log("preventing touchstarts default");
//			//ev.preventDefault();
//		}
//        if (typeof(ev.touches) !== "undefined") {
//        	//console.log("touchstart: using ev.touches[0]");
//    		DigiWebApp.WipeController.wipeStartX = ev.touches[0].pageX;
//    		DigiWebApp.WipeController.wipeStartY = ev.touches[0].pageY;
//        } else if ( typeof(ev.originalEvent.touches) !== "undefined" ) {
//        	//console.log("touchstart: using ev.originalEvent.touches[0].page...");
//        	DigiWebApp.WipeController.wipeStartX = ev.originalEvent.touches[0].pageX;
//        	DigiWebApp.WipeController.wipeStartY = ev.originalEvent.touches[0].pageY;
//        } else {
//        	//console.log("touchstart: using ev.page...");
//        	DigiWebApp.WipeController.wipeStartX = ev.pageX;
//        	DigiWebApp.WipeController.wipeStartY = ev.pageY;
//        }
//        //console.log("DigiWebApp.WipeController.wipeStartX: " + DigiWebApp.WipeController.wipeStartX);
//        //console.log("DigiWebApp.WipeController.wipeStartY: " + DigiWebApp.WipeController.wipeStartY);
//		DigiWebApp.WipeController.wipeIsMoving = false;
//		DigiWebApp.WipeController.wipeIsPressed = true;
//		DigiWebApp.WipeController.wipeIsPressedStart = (+new Date()).toString();
//		DigiWebApp.WipeController.wipeIsPressedStop = null;
//		var eventType = ev.type.substr(0,5);
//		//alert(eventType);
//		//console.log("binding " + eventType + "move for pageid " + pageid);
//    	var myPlatform = M.Environment.getPlatform();
//
//    	var deviceversion = "0";
//    	if (typeof(device) !== "undefined") deviceversion = new String(device.version);
//
//    	var deviceplatform = "";
//    	if (typeof(device) !== "undefined") deviceplatform = new String(device.platform);
//    	
//
//        if (       ( myPlatform.substr(-2)  === "86" )
//        		|| ( myPlatform.substr(-5)  === "Win32" )
//        		|| ( myPlatform.substr(-5)  === "Win64" )
//        		|| ( myPlatform.substr(0,3) === "Mac" )
//        		|| ( myPlatform.substr(0,2) === "iP")
//        		|| (DigiWebApp.SettingsController.globalDebugMode)
//        		|| ( ( deviceversion.substr(0,1) >= 4 ) && ( deviceplatform.substr(0,7) >= "Android" ) && (DigiWebApp.SettingsController.globalDebugMode) )
//        	) {
//    		try { $('#' + pageid).bind(eventType + 'move', DigiWebApp.WipeController.wipeOnTouchMove); } catch (e) { console.log("error while binding " + eventType + "move for " + pageid);}
//    		if (eventType === "touch") {
//    			//console.log("binding touchstop for pageid " + pageid);
//    			try { $('#' + pageid).bind('touchstop', DigiWebApp.WipeController.wipeOnMoveStop); } catch (e) { console.log("error while binding touchstop for " + pageid);};
//    		} else if (eventType === "mouse") {
//    			//console.log("binding mouseup for pageid " + pageid);
//    			try { $('#' + pageid).bind('mouseup', DigiWebApp.WipeController.wipeOnMoveStop); } catch (e) { console.log("error while binding mouseup for " + pageid);};
//    		} else {
//    			console.log("unknown eventtype: " + ev.type);
//    		}
//        } else {
//        	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("skipping touchmove");
//        }
//	}
//	
//});
