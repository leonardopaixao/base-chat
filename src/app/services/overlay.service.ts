import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { MarkerComponent } from '../marker/marker.component';
import { MarkerOverlayRef } from '../marker-overlay-ref';

interface MarkerDialogConfig {
	panelClass?: string;
	hasBackdrop?: boolean;
	backdropClass?: string;
}

const DEFAULT_CONFIG: MarkerDialogConfig = {
	hasBackdrop: true,
	backdropClass: 'dark-backdrop',
	panelClass: 'tm-file-preview-dialog-panel'
}

@Injectable({
	providedIn: 'root'
})

export class OverlayService {

	constructor(private overlay: Overlay) { }

	// open(){
	// 	// Returns an OverlayRef which is a PortalHost
	// 	const overlayRef = this.overlay.create({
	// 		height: '400px',
	// 		width: '600px',
	// 	  });

	// 	// Create ComponentPortal that can be attached to a PortalHost
	// 	const filePreviewPortal = new ComponentPortal(MarkerComponent);

	// 	// Attach ComponentPortal to PortalHost
	// 	overlayRef.attach(filePreviewPortal);
	// }

	open(config: MarkerDialogConfig = {}) {
		// Override default configuration
		const dialogConfig = { ...DEFAULT_CONFIG, ...config };
	
		// Returns an OverlayRef which is a PortalHost
		const overlayRef = this.createOverlay(dialogConfig);

		// Instantiate remote control
		const dialogRef = new MarkerOverlayRef(overlayRef);
	
		// Create ComponentPortal that can be attached to a PortalHost
		const filePreviewPortal = new ComponentPortal(MarkerComponent);
	
		// Attach ComponentPortal to PortalHost
		overlayRef.attach(filePreviewPortal);

		overlayRef.backdropClick().pipe().subscribe( _ => dialogRef.close() );
		return dialogRef;
	}

 	private createOverlay(config: MarkerDialogConfig) {
		const overlayConfig = this.getOverlayConfig(config);
		return this.overlay.create(overlayConfig);
	}

	private getOverlayConfig(config: MarkerDialogConfig): OverlayConfig {
		
		const positionStrategy = this.overlay.position()
		  .global()
		  .left()
		  .bottom('45px');
		
		const overlayConfig = new OverlayConfig({
		  hasBackdrop	: config.hasBackdrop,
		  backdropClass	: config.backdropClass,
		  panelClass	: config.panelClass,
		  scrollStrategy: this.overlay.scrollStrategies.block(),
		  height		: '400px',
		  width			: '165px',
		  positionStrategy,
		});
	
		return overlayConfig;
	}
}
