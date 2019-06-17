import { Layer } from 'leaflet';

export class LeafletLayersFECreditModel {

	constructor(
		public overlayLayers: {
			id: string,
			name: string,
			enabled: boolean,
			layer: Layer
		}[] = []
	) { }

}
