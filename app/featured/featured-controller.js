function FeaturedCtrl (TwitchApiService) {
	TwitchApiService.getFeaturedStreams();

	this.featured = TwitchApiService.featured;
}