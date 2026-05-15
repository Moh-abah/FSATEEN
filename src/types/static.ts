// Static page types

export interface StaticPage {
  id: string;
  slug: string;
  title: string;
  title_ar?: string;
  content: string;
  content_ar?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StaticPageCreate {
  slug: string;
  title: string;
  content: string;
}

export interface StaticPageUpdate {
  title?: string;
  content?: string;
}
