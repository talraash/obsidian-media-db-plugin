import { MediaTypeModel } from './MediaTypeModel';
import { mediaDbTag, migrateObject } from '../utils/Utils';
import { MediaType } from '../utils/MediaType';

export class GameModel extends MediaTypeModel {
	genres: string[];
	onlineRating: number;
	image: string;
	screenshots: string[];
	movies: string[];
	short_description: string;
	metacritic_url: string;

	released: boolean;
	releaseDate: string;

	userData: {
		played: boolean;
		personalRating: number;
	};

	constructor(obj: any = {}) {
		super();

		this.genres = undefined;
		this.onlineRating = undefined;
		this.image = undefined;
		this.screenshots = undefined;
		this.short_description = undefined;
		this.movies = undefined;
		this.metacritic_url = undefined;
		this.released = undefined;
		this.releaseDate = undefined;
		this.userData = {
			played: undefined,
			personalRating: undefined,
		};

		migrateObject(this, obj, this);

		if (!obj.hasOwnProperty('userData')) {
			migrateObject(this.userData, obj, this.userData);
		}

		this.type = this.getMediaType();
	}

	getTags(): string[] {
		return [mediaDbTag, 'game'];
	}

	getMediaType(): MediaType {
		return MediaType.Game;
	}

	getSummary(): string {
		return this.englishTitle + ' (' + this.year + ')';
	}
}
