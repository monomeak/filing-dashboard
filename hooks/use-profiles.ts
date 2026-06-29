"use client";

import { useEffect, useState } from "react";

import {
  type ActiveProfile,
  type Organization,
  createDemoOrganization,
  defaultOrganizations,
  getInitials,
  personalProfile,
} from "@/lib/profile-data";

const organizationsStorageKey = "filing-app-organizations";
const activeProfileStorageKey = "filing-app-active-profile";
const profileStorageEvent = "filing-app-profile-storage";

const defaultActiveProfile: ActiveProfile = {
  type: "personal",
  id: 'personal-id',
  name: personalProfile.name,
  initials: personalProfile.initials,
};

function readJson<T>(key: string, fallback: T) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeOrganizations(organizations: Organization[]) {
  return organizations.map((organization, index) => ({
    ...organization,
    accountNumber:
      organization.accountNumber ??
      `ORG-${String(4000 + index).padStart(4, "0")}`,
    balance: organization.balance ?? "$0.00",
    ownerName: organization.ownerName ?? personalProfile.name,
  }));
}

export function useProfiles() {
  const [organizations, setOrganizations] =
    useState<Organization[]>(defaultOrganizations);
  const [activeProfile, setActiveProfile] =
    useState<ActiveProfile>(defaultActiveProfile);

  useEffect(() => {
    const syncProfiles = () => {
      setOrganizations(
        normalizeOrganizations(
          readJson(organizationsStorageKey, defaultOrganizations),
        ),
      );
      setActiveProfile(readJson(activeProfileStorageKey, defaultActiveProfile));
    };

    syncProfiles();

    window.addEventListener("storage", syncProfiles);
    window.addEventListener(profileStorageEvent, syncProfiles);

    return () => {
      window.removeEventListener("storage", syncProfiles);
      window.removeEventListener(profileStorageEvent, syncProfiles);
    };
  }, []);

  const notifyProfileChange = () => {
    window.dispatchEvent(new Event(profileStorageEvent));
  };

  const saveOrganizations = (nextOrganizations: Organization[]) => {
    setOrganizations(nextOrganizations);
    window.localStorage.setItem(
      organizationsStorageKey,
      JSON.stringify(nextOrganizations),
    );
    notifyProfileChange();
  };

  const switchProfile = (profile: ActiveProfile) => {
    setActiveProfile(profile);
    window.localStorage.setItem(
      activeProfileStorageKey,
      JSON.stringify(profile),
    );
    notifyProfileChange();
  };

  const createOrganization = (name: string) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return null;
    }

    const organization = createDemoOrganization(trimmedName);
    const nextOrganizations = [...organizations, organization];
    const nextActiveProfile: ActiveProfile = {
      type: "organization",
      id: organization.id,
      name: organization.name,
      initials: getInitials(organization.name) || "O",
    };

    saveOrganizations(nextOrganizations);
    switchProfile(nextActiveProfile);

    return organization;
  };

  return {
    activeProfile,
    createOrganization,
    organizations,
    switchProfile,
  };
}
