import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppUser } from "src/app/models/core/AppUser";

export const featureSelector = createFeatureSelector<AppUser>("auth");
export const listCampaignsSelector = createSelector(
	featureSelector,
	(user: AppUser) => user.campaigns
);
