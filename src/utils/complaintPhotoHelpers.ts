import { Complaint, ComplaintCategory } from '../types';

/**
 * Returns the appropriate, category-accurate before image for any civic complaint.
 * Ensures consistent, realistic images matching the official UrbanFix task category mappings.
 */
export const getComplaintBeforePhoto = (complaint: Partial<Complaint> | { category: ComplaintCategory; title?: string; photos?: { before?: string } }): string => {
  // If the complaint already has an explicit before photo that isn't a known wrong placeholder
  if (complaint.photos?.before) {
    const b = complaint.photos.before;
    // Fix known mismatched placeholders:
    if (complaint.category === 'toilet' && b.includes('drain')) {
      return '/photos/toilet_before.jpg';
    }
    if (complaint.title?.toLowerCase().includes('manhole') && !b.includes('manhole')) {
      return '/photos/manhole_before.jpg';
    }
    return b;
  }

  return getCategoryDefaultBefore(complaint.category, complaint.title);
};

/**
 * Returns the default before photo for a given category and optional title.
 */
export const getCategoryDefaultBefore = (category?: ComplaintCategory, title?: string): string => {
  const t = (title || '').toLowerCase();
  if (t.includes('manhole')) return '/photos/manhole_before.jpg';

  switch (category) {
    case 'pothole':
      return '/photos/pothole_lakeview.jpg';
    case 'garbage':
      return '/photos/garbage_bins.jpg';
    case 'drain':
      return '/photos/drain_before.jpg';
    case 'water_leakage':
      return '/photos/water_leak_before.jpg';
    case 'streetlight':
      return '/photos/streetlight.jpg';
    case 'footpath':
      return '/photos/broken_paving.jpg';
    case 'toilet':
      return '/photos/toilet_before.jpg';
    case 'bus_stop':
      return '/photos/bus_stop_shelter.jpg';
    default:
      return '/photos/pothole_lakeview.jpg';
  }
};

/**
 * Returns the appropriate, category-accurate after photo showing completed repair evidence.
 */
export const getComplaintAfterPhoto = (complaint: Partial<Complaint> | { category: ComplaintCategory; title?: string; photos?: { after?: string } }): string | undefined => {
  if (complaint.photos?.after) {
    const a = complaint.photos.after;
    // Correct known mismatches where road patch was used for other categories:
    if (complaint.category === 'garbage' && (a.includes('road_patch') || a.includes('garbage_bins'))) {
      return '/photos/garbage_after.jpg';
    }
    if (complaint.category === 'water_leakage' && a.includes('road_patch')) {
      return '/photos/water_leak_after.jpg';
    }
    if (complaint.category === 'footpath' && a.includes('road_patch')) {
      return '/photos/footpath_after.jpg';
    }
    if (complaint.category === 'toilet' && a.includes('drain')) {
      return '/photos/toilet_after.jpg';
    }
    if (complaint.title?.toLowerCase().includes('manhole') && a.includes('road_patch')) {
      return '/photos/manhole_after.jpg';
    }
    return a;
  }

  return undefined;
};

/**
 * Returns the default after photo for a category when repair is marked completed.
 */
export const getCategoryDefaultAfter = (category?: ComplaintCategory, title?: string): string => {
  const t = (title || '').toLowerCase();
  if (t.includes('manhole')) return '/photos/manhole_after.jpg';

  switch (category) {
    case 'pothole':
      return '/photos/road_patch_after.jpg';
    case 'garbage':
      return '/photos/garbage_after.jpg';
    case 'drain':
      return '/photos/drain_after.jpg';
    case 'water_leakage':
      return '/photos/water_leak_after.jpg';
    case 'streetlight':
      return '/photos/streetlight_after.jpg';
    case 'footpath':
      return '/photos/footpath_after.jpg';
    case 'toilet':
      return '/photos/toilet_after.jpg';
    case 'bus_stop':
      return '/photos/bus_stop_shelter.jpg';
    default:
      return '/photos/road_patch_after.jpg';
  }
};

/**
 * Format category name for UI badges
 */
export const formatCategoryLabel = (category?: ComplaintCategory, title?: string): string => {
  const t = (title || '').toLowerCase();
  if (t.includes('manhole')) return 'Manhole Repair';

  switch (category) {
    case 'pothole':
      return 'Pothole Repair';
    case 'garbage':
      return 'Garbage Collection';
    case 'drain':
      return 'Drainage Cleaning';
    case 'water_leakage':
      return 'Water Leakage';
    case 'streetlight':
      return 'Streetlight Repair';
    case 'footpath':
      return 'Footpath Repair';
    case 'toilet':
      return 'Public Toilet';
    case 'bus_stop':
      return 'Bus Stop Shelter';
    default:
      return 'Civic Repair';
  }
};

