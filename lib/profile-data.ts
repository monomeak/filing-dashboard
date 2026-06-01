export type Organization = {
  id: string;
  name: string;
  accountNumber: string;
  balance: string;
  ownerName: string;
};

export type ActiveProfile =
  | { type: "personal"; name: string; initials: string }
  | { type: "organization"; id: string; name: string; initials: string };

export const personalProfile = {
  name: "Kylian Mbappe",
  accountNumber: "ACC-1001",
  balance: "$2,450.00",
  avatar: "mbappe.png",
  initials: "KM",
};

export const defaultOrganizations: Organization[] = [
  {
    id: "acme-corp",
    name: "Acme Corp",
    accountNumber: "ORG-2048",
    balance: "$12,880.50",
    ownerName: personalProfile.name,
  },
  {
    id: "tech-startup",
    name: "Tech Startup",
    accountNumber: "ORG-3092",
    balance: "$7,320.25",
    ownerName: personalProfile.name,
  },
];

export function createDemoOrganization(name: string): Organization {
  const seed = Math.floor(1000 + Math.random() * 9000);

  return {
    id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
    name,
    accountNumber: `ORG-${seed}`,

    balance: `$${(seed * 3.75).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    ownerName: personalProfile.name,
  };
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}
