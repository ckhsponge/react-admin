import { Identifier, RaRecord } from 'react-admin';

export interface Sale extends RaRecord {
    first_name: string;
    last_name: string;
    email: string;
}

export interface Company extends RaRecord {
    name: string;
    logo: { title: string; src: string };
    sector: string;
    size: 1 | 10 | 50 | 250 | 500;
    linkedIn: string;
    website: string;
    phone_number: string;
    address: string;
    zipcode: string;
    city: string;
    stateAbbr: string;
    nb_contacts: number;
    nb_deals: number;
    sales_id: Identifier;
    created_at: string;
    description: string;
    revenue: string;
    taxe_identifier: string;
    country: string;
    context_links: string[];
}

export interface Contact extends RaRecord {
    first_name: string;
    last_name: string;
    title: string;
    company_id: Identifier;
    email: string;
    avatar?: string;
    linkedin_url?: string;
    first_seen: string;
    last_seen: string;
    has_newsletter: Boolean;
    tags: Identifier[];
    gender: string;
    sales_id: Identifier;
    nb_notes: number;
    status: string;
    background: string;
}

export interface ContactNote extends RaRecord {
    contact_id: Identifier;
    type: string;
    text: string;
    date: string;
    sales_id: Identifier;
    status: string;
    attachment?: { title: string; src: string };
}

export interface Deal extends RaRecord {
    name: string;
    company_id: Identifier;
    contact_ids: Identifier[];
    type: string;
    stage: string;
    description: string;
    amount: number;
    created_at: string;
    updated_at: string;
    archived_at?: string;
    start_at: string;
    expecting_closing_date: string;
    sales_id: Identifier;
    index: number;
    nb_notes: number;
}

export interface Tag extends RaRecord {
    name: string;
    color: string;
}

export interface User extends RaRecord {
    full_name: string;
    email: string;
    password: string;
    administrator: boolean;
}
