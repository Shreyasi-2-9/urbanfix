import { Complaint } from '../types';

export const ADDITIONAL_COMPLAINTS: Complaint[] = [
  // Colaba
  {
    id: 'UF-501',
    title: 'Broken sodium-vapor lamp near Colaba Post Office',
    description: 'Streetlight pole 7 has cracked glass casing and broken bulb. Street remains dark.',
    category: 'streetlight',
    status: 'assigned',
    priority: 'normal',
    location: {
      address: 'Colaba Causeway, Near Post Office',
      landmark: 'Near Regal Cinema Junction',
      ward: 'Ward A (Colaba, Fort, Churchgate)',
      lat: 18.9210,
      lng: 72.8315,
    },
    citizen: { name: 'Kunal Shah', email: 'kunal.s@example.com', phone: '+91 98201 11001', isAnonymous: false },
    reportedAt: '2026-10-18T19:00:00+05:30',
    deadline: '2026-10-21T19:00:00+05:30',
    progress: 15,
    votes: 21,
    hasVoted: false,
    photos: { before: '/photos/streetlight.jpg' },
    timeline: [
      { id: 'tl-501-1', title: 'Report registered', description: 'Citizen logged dark street corner.', timestamp: '2026-10-18T19:00:00+05:30', actor: 'Kunal Shah', role: 'Citizen', type: 'reported' }
    ]
  },
  // Fort
  {
    id: 'UF-502',
    title: 'Water pooling on pavement near Horniman Circle',
    description: 'Sub-surface seepage filling heritage basalt paving joints, causing moss growth and slipping hazard.',
    category: 'water_leakage',
    status: 'reported',
    priority: 'normal',
    location: {
      address: 'Horniman Circle, Fort',
      landmark: 'Opposite Asiatic Society Steps',
      ward: 'Ward A (Colaba, Fort, Churchgate)',
      lat: 18.9315,
      lng: 72.8365,
    },
    citizen: { name: 'Ratan Tata (Memorial Trust)', email: 'trust@example.com', phone: '+91 98200 00001', isAnonymous: false },
    reportedAt: '2026-10-20T08:15:00+05:30',
    deadline: '2026-10-23T08:15:00+05:30',
    progress: 0,
    votes: 34,
    hasVoted: false,
    photos: { before: '/photos/water_leak_before.jpg' },
    timeline: [
      { id: 'tl-502-1', title: 'Report logged', description: 'Heritage precinct seepage noted.', timestamp: '2026-10-20T08:15:00+05:30', actor: 'Ratan Tata Trust', role: 'Citizen', type: 'reported' }
    ]
  },
  // Churchgate
  {
    id: 'UF-503',
    title: 'Damaged steel railings at Churchgate Pedestrian Crossing',
    description: 'Traffic accident twisted steel crowd control railings. Sharp edges sticking out towards school crowd.',
    category: 'footpath',
    status: 'in_progress',
    priority: 'high',
    location: {
      address: 'Veer Nariman Road, Churchgate',
      landmark: 'Near Eros Cinema Building',
      ward: 'Ward A (Colaba, Fort, Churchgate)',
      lat: 18.9335,
      lng: 72.8275,
    },
    citizen: { name: 'Shyam Benegal', email: 'shyam.b@example.com', phone: '+91 98202 33441', isAnonymous: false },
    reportedAt: '2026-10-19T10:00:00+05:30',
    deadline: '2026-10-20T22:00:00+05:30',
    progress: 70,
    votes: 28,
    hasVoted: false,
    photos: { before: '/photos/broken_paving.jpg' },
    timeline: [
      { id: 'tl-503-1', title: 'Report logged', description: 'Welders straightening iron bars.', timestamp: '2026-10-19T10:00:00+05:30', actor: 'Shyam Benegal', role: 'Citizen', type: 'reported' }
    ]
  },
  // Marine Drive
  {
    id: 'UF-504',
    title: 'Missing sea wall granite coping stone',
    description: 'High tide wave action dislodged 200kg coping stone on Marine Drive seawall near Taraporewala Aquarium.',
    category: 'footpath',
    status: 'assigned',
    priority: 'high',
    location: {
      address: 'Marine Drive Seaface',
      landmark: 'Opposite Taraporewala Aquarium',
      ward: 'Ward C (Marine Lines, Kalbadevi)',
      lat: 18.9480,
      lng: 72.8210,
    },
    citizen: { name: 'Dr. Homi Bhabha (Centre)', email: 'hbcse@example.com', phone: '+91 98205 77889', isAnonymous: false },
    reportedAt: '2026-10-19T12:00:00+05:30',
    deadline: '2026-10-21T12:00:00+05:30',
    progress: 20,
    votes: 62,
    hasVoted: true,
    photos: { before: '/photos/broken_paving.jpg' },
    timeline: [
      { id: 'tl-504-1', title: 'Seawall gap reported', description: 'Assigned to Coastal Engineering division.', timestamp: '2026-10-19T12:00:00+05:30', actor: 'HBCSE', role: 'Citizen', type: 'reported' }
    ]
  },
  // CST
  {
    id: 'UF-505',
    title: 'Sewer backflow outside CST GPO Lane',
    description: 'Foul-smelling blackwater bubbling from inspection chamber on footpath beside General Post Office.',
    category: 'drain',
    status: 'in_progress',
    priority: 'critical',
    location: {
      address: 'Walchand Hirachand Marg, Fort',
      landmark: 'Beside General Post Office (GPO)',
      ward: 'Ward A (Colaba, Fort, Churchgate)',
      lat: 18.9415,
      lng: 72.8375,
    },
    citizen: { name: 'Manoj Bajpayee', email: 'manoj.b@example.com', phone: '+91 98199 11223', isAnonymous: false },
    reportedAt: '2026-10-20T06:00:00+05:30',
    deadline: '2026-10-20T18:00:00+05:30',
    progress: 50,
    votes: 84,
    hasVoted: true,
    photos: { before: '/photos/manhole_before.jpg' },
    timeline: [
      { id: 'tl-505-1', title: 'Sewer chamber choked', description: 'Suction jetting unit operating.', timestamp: '2026-10-20T06:00:00+05:30', actor: 'Manoj Bajpayee', role: 'Citizen', type: 'reported' }
    ]
  },
  // Byculla
  {
    id: 'UF-506',
    title: 'Overflowing community dumpster at Mazgaon Dock Gate',
    description: 'Industrial and domestic refuse spilling over onto port truck lane.',
    category: 'garbage',
    status: 'assigned',
    priority: 'normal',
    location: {
      address: 'Dockyard Road, Mazgaon',
      landmark: 'Outside Mazgaon Dock Main Gate',
      ward: 'Ward E (Byculla, Mazgaon)',
      lat: 18.9680,
      lng: 72.8450,
    },
    citizen: { name: 'Capt. R. K. Nair', email: 'rnair@example.com', phone: '+91 98203 44556', isAnonymous: false },
    reportedAt: '2026-10-19T14:00:00+05:30',
    deadline: '2026-10-22T14:00:00+05:30',
    progress: 10,
    votes: 27,
    hasVoted: false,
    photos: { before: '/photos/garbage_bins.jpg' },
    timeline: [
      { id: 'tl-506-1', title: 'Dumpster report logged', description: 'Ward E compactors scheduled.', timestamp: '2026-10-19T14:00:00+05:30', actor: 'Capt. Nair', role: 'Citizen', type: 'reported' }
    ]
  },
  // Parel
  {
    id: 'UF-507',
    title: 'Sunken road trench outside Tata Memorial Hospital',
    description: 'Utility trench has settled by 6 inches; patient transfer ambulances jolting violently.',
    category: 'pothole',
    status: 'in_progress',
    priority: 'critical',
    location: {
      address: 'Dr. Ernest Borges Road, Parel',
      landmark: 'Outside Tata Memorial Hospital Emergency',
      ward: 'Ward F/South (Parel, Lalbaug, Sewri)',
      lat: 18.9975,
      lng: 72.8428,
    },
    citizen: { name: 'Dr. R. Badwe', email: 'tmh.office@example.com', phone: '+91 98204 99001', isAnonymous: false },
    reportedAt: '2026-10-19T21:00:00+05:30',
    deadline: '2026-10-20T09:00:00+05:30', // Overdue!
    progress: 70,
    votes: 95,
    hasVoted: true,
    photos: { before: '/photos/pothole_lakeview.jpg' },
    timeline: [
      { id: 'tl-507-1', title: 'Hospital emergency road patch', description: 'Asphalt cold mix laid.', timestamp: '2026-10-19T21:00:00+05:30', actor: 'Dr. Badwe', role: 'Citizen', type: 'reported' }
    ]
  },
  // Lalbaug
  {
    id: 'UF-508',
    title: 'Broken water tap cluster at public chawl facility',
    description: 'Four brass bib taps broken off causing 15,000 litres daily loss and muddy courtyard.',
    category: 'water_leakage',
    status: 'verified',
    priority: 'normal',
    location: {
      address: 'Chinchpokli Chawl Lane, Lalbaug',
      landmark: 'Near Ganesh Gully Gate',
      ward: 'Ward F/South (Parel, Lalbaug, Sewri)',
      lat: 18.9920,
      lng: 72.8390,
    },
    citizen: { name: 'Sanjay Jadhav', email: 'sanjay.j@example.com', phone: '+91 98211 22334', isAnonymous: false },
    reportedAt: '2026-10-15T09:00:00+05:30',
    deadline: '2026-10-18T09:00:00+05:30',
    progress: 100,
    votes: 46,
    hasVoted: true,
    verifiedAt: '2026-10-18T16:00:00+05:30',
    verifiedBy: 'Sanjay Jadhav (Citizen)',
    photos: { before: '/photos/water_leak_before.jpg', after: '/photos/water_leak_after.jpg' },
    timeline: [
      { id: 'tl-508-1', title: 'Taps replaced', description: 'Heavy duty theft-resistant fittings installed.', timestamp: '2026-10-18T16:00:00+05:30', actor: 'Sanjay Jadhav', role: 'Citizen', type: 'verified' }
    ]
  },
  // Dadar
  {
    id: 'UF-509',
    title: 'Bus queue shelter broken at Plaza Cinema Dadar',
    description: 'Corrugated roof sheet torn off by wind hanging precariously above commuters.',
    category: 'bus_stop',
    status: 'in_progress',
    priority: 'high',
    location: {
      address: 'N. C. Kelkar Road, Dadar West',
      landmark: 'Outside Plaza Cinema Bus Stop',
      ward: 'Ward G/North (Dadar, Dharavi, Mahim)',
      lat: 19.0235,
      lng: 72.8415,
    },
    citizen: { name: 'Nana Patekar', email: 'nana.p@example.com', phone: '+91 98200 44551', isAnonymous: false },
    reportedAt: '2026-10-19T11:00:00+05:30',
    deadline: '2026-10-21T11:00:00+05:30',
    progress: 50,
    votes: 39,
    hasVoted: false,
    photos: { before: '/photos/bus_stop_shelter.jpg' },
    timeline: [
      { id: 'tl-509-1', title: 'Shelter hazard logged', description: 'Sheet dismantled safely.', timestamp: '2026-10-19T11:00:00+05:30', actor: 'Nana Patekar', role: 'Citizen', type: 'reported' }
    ]
  },
  // Worli
  {
    id: 'UF-510',
    title: 'Open stormwater inspection chamber in Worli Koliwada',
    description: 'Stone cover cracked in village coastal lane. High risk during evening tide.',
    category: 'drain',
    status: 'awaiting_verification',
    priority: 'high',
    location: {
      address: 'Worli Village Main Road, Koliwada',
      landmark: 'Near Worli Fort Base Jetty',
      ward: 'Ward G/South (Worli, Prabhadevi)',
      lat: 19.0250,
      lng: 72.8150,
    },
    citizen: { name: 'Hemant Koli', email: 'hemant.k@example.com', phone: '+91 98194 66778', isAnonymous: false },
    reportedAt: '2026-10-18T14:00:00+05:30',
    deadline: '2026-10-20T14:00:00+05:30',
    progress: 100,
    votes: 53,
    hasVoted: true,
    photos: { before: '/photos/drain_before.jpg', after: '/photos/drain_after.jpg' },
    timeline: [
      { id: 'tl-510-1', title: 'Cover fitted', description: 'RCC heavy cover seated and grouted.', timestamp: '2026-10-20T08:00:00+05:30', actor: 'Drainage Squad G/S', role: 'Field Worker', type: 'awaiting_verification' }
    ]
  },
  // Prabhadevi
  {
    id: 'UF-511',
    title: 'Flickering high-mast lamp at Prabhadevi Junction',
    description: 'High mast cluster lamp 3 out of 6 luminaires off; intersection dimly lit.',
    category: 'streetlight',
    status: 'assigned',
    priority: 'normal',
    location: {
      address: 'Babasaheb Parulekar Marg, Prabhadevi',
      landmark: 'Prabhadevi Station West Entrance',
      ward: 'Ward G/South (Worli, Prabhadevi)',
      lat: 19.0145,
      lng: 72.8285,
    },
    citizen: { name: 'Kishore Kumar (Trust)', email: 'kk.trust@example.com', phone: '+91 98203 11229', isAnonymous: false },
    reportedAt: '2026-10-19T18:00:00+05:30',
    deadline: '2026-10-22T18:00:00+05:30',
    progress: 20,
    votes: 18,
    hasVoted: false,
    photos: { before: '/photos/streetlight.jpg' },
    timeline: [
      { id: 'tl-511-1', title: 'Report logged', description: 'Sky-lift crane booked for high-mast maintenance.', timestamp: '2026-10-19T18:00:00+05:30', actor: 'Citizen Trust', role: 'Citizen', type: 'reported' }
    ]
  },
  // Bandra
  {
    id: 'UF-512',
    title: 'Broken paver promenade at Carter Road Bandra',
    description: 'Sea spray erosion undermined red paver blocks along joggers track.',
    category: 'footpath',
    status: 'in_progress',
    priority: 'normal',
    location: {
      address: 'Carter Road Promenade, Bandra West',
      landmark: 'Near Carter Road Amphitheatre',
      ward: 'Ward 12 · Lakeview / Bandra',
      lat: 19.0650,
      lng: 72.8230,
    },
    citizen: { name: 'Kareena Kapoor (Fan Club)', email: 'kareena.fc@example.com', phone: '+91 98201 33445', isAnonymous: false },
    reportedAt: '2026-10-18T07:00:00+05:30',
    deadline: '2026-10-21T07:00:00+05:30',
    progress: 40,
    votes: 41,
    hasVoted: true,
    assignedWorker: { id: 'worker-05', name: 'Santosh Jadhav', specialty: 'Footpaths & Masonry', ward: 'Ward 12 · Lakeview / Bandra', phone: '+91 98700 33219' },
    photos: { before: '/photos/broken_paving.jpg' },
    timeline: [
      { id: 'tl-512-1', title: 'Promenade reported', description: 'Santosh Jadhav resetting border tiles.', timestamp: '2026-10-18T07:00:00+05:30', actor: 'Kareena Fan', role: 'Citizen', type: 'reported' }
    ]
  },
  // Khar
  {
    id: 'UF-513',
    title: 'Accumulated coconut shells and green waste on 14th Road Khar',
    description: 'Commercial juice vendor dumping bags of tender coconut shells on footpath.',
    category: 'garbage',
    status: 'reported',
    priority: 'normal',
    location: {
      address: '14th Road, Khar West',
      landmark: 'Near Khar Gymkhana Back Gate',
      ward: 'Ward 12 · Lakeview / Bandra',
      lat: 19.0720,
      lng: 72.8340,
    },
    citizen: { name: 'Rahul Khanna', email: 'rahul.k@example.com', phone: '+91 98205 99887', isAnonymous: false },
    reportedAt: '2026-10-20T08:30:00+05:30',
    deadline: '2026-10-23T08:30:00+05:30',
    progress: 0,
    votes: 14,
    hasVoted: false,
    photos: { before: '/photos/garbage_bins.jpg' },
    timeline: [
      { id: 'tl-513-1', title: 'Report registered', description: 'Enforcement inspection queued.', timestamp: '2026-10-20T08:30:00+05:30', actor: 'Rahul Khanna', role: 'Citizen', type: 'reported' }
    ]
  },
  // Santacruz
  {
    id: 'UF-514',
    title: 'Pothole on Juhu Tara Road near Santacruz junction',
    description: 'Monsoon rutting creating sharp edges on asphalt near luxury hotel crossing.',
    category: 'pothole',
    status: 'in_progress',
    priority: 'high',
    location: {
      address: 'Juhu Tara Road, Santacruz West',
      landmark: 'Near Sea Princess Hotel Cross',
      ward: 'Ward 12 · Lakeview / Bandra',
      lat: 19.0880,
      lng: 72.8280,
    },
    citizen: { name: 'Abhishek Bachchan', email: 'abhishek.b@example.com', phone: '+91 98200 11990', isAnonymous: false },
    reportedAt: '2026-10-19T15:00:00+05:30',
    deadline: '2026-10-20T21:00:00+05:30',
    progress: 60,
    votes: 58,
    hasVoted: true,
    photos: { before: '/photos/pothole_lakeview.jpg' },
    timeline: [
      { id: 'tl-514-1', title: 'Report logged', description: 'Road crew filling base course.', timestamp: '2026-10-19T15:00:00+05:30', actor: 'Abhishek Bachchan', role: 'Citizen', type: 'reported' }
    ]
  },
  // Andheri
  {
    id: 'UF-515',
    title: 'Choked culvert under Andheri Kurla Road',
    description: 'Heavy construction mud from metro pillar washing into culvert; water backing up 18 inches.',
    category: 'drain',
    status: 'in_progress',
    priority: 'critical',
    location: {
      address: 'Andheri-Kurla Road, Chakala',
      landmark: 'Near Chakala Metro Station Pillar 42',
      ward: 'Ward K/East (Andheri East, Jogeshwari)',
      lat: 19.1120,
      lng: 72.8620,
    },
    citizen: { name: 'Anil Kapoor', email: 'anil.k@example.com', phone: '+91 98202 55667', isAnonymous: false },
    reportedAt: '2026-10-19T19:00:00+05:30',
    deadline: '2026-10-20T07:00:00+05:30', // Overdue!
    progress: 50,
    votes: 89,
    hasVoted: true,
    photos: { before: '/photos/drain_before.jpg' },
    timeline: [
      { id: 'tl-515-1', title: 'Culvert blocked', description: 'Suction tanker deployed.', timestamp: '2026-10-19T19:00:00+05:30', actor: 'Anil Kapoor', role: 'Citizen', type: 'reported' }
    ]
  },
  // Jogeshwari
  {
    id: 'UF-516',
    title: 'Broken municipal community toilet door at Jogeshwari Caves Road',
    description: 'Vandalized doors and water leak in municipal public convenience unit.',
    category: 'toilet',
    status: 'assigned',
    priority: 'normal',
    location: {
      address: 'Jogeshwari Caves Road, Jogeshwari East',
      landmark: 'Near Archaeological Caves Entrance',
      ward: 'Ward K/East (Andheri East, Jogeshwari)',
      lat: 19.1380,
      lng: 72.8610,
    },
    citizen: { name: 'Nawazuddin Siddiqui', email: 'nawaz.s@example.com', phone: '+91 98197 12345', isAnonymous: false },
    reportedAt: '2026-10-19T09:00:00+05:30',
    deadline: '2026-10-22T09:00:00+05:30',
    progress: 20,
    votes: 22,
    hasVoted: false,
    photos: { before: '/photos/toilet_before.jpg' },
    timeline: [
      { id: 'tl-516-1', title: 'Sanitation report logged', description: 'Assigned to carpentry contractor.', timestamp: '2026-10-19T09:00:00+05:30', actor: 'Nawazuddin Siddiqui', role: 'Citizen', type: 'reported' }
    ]
  },
  // Goregaon
  {
    id: 'UF-517',
    title: 'Cracked bridge expansion joint on Aarey Road',
    description: 'Steel teeth on bridge expansion joint broken; tires suffering punctures.',
    category: 'pothole',
    status: 'assigned',
    priority: 'high',
    location: {
      address: 'Aarey Milk Colony Main Road',
      landmark: 'Near Aarey Picnic Point Bridge',
      ward: 'Ward P/South (Goregaon)',
      lat: 19.1550,
      lng: 72.8750,
    },
    citizen: { name: 'Pooja Bedi', email: 'pooja.b@example.com', phone: '+91 98203 44112', isAnonymous: false },
    reportedAt: '2026-10-19T14:30:00+05:30',
    deadline: '2026-10-21T14:30:00+05:30',
    progress: 10,
    votes: 37,
    hasVoted: true,
    photos: { before: '/photos/pothole_lakeview.jpg' },
    timeline: [
      { id: 'tl-517-1', title: 'Bridge joint hazard', description: 'Bridge inspection crew notified.', timestamp: '2026-10-19T14:30:00+05:30', actor: 'Pooja Bedi', role: 'Citizen', type: 'reported' }
    ]
  },
  // Malad
  {
    id: 'UF-518',
    title: 'Illegal construction debris dump on Marve Road',
    description: 'Dumpers unloading concrete rubble across 50 meters of mangrove border footpath.',
    category: 'garbage',
    status: 'in_progress',
    priority: 'high',
    location: {
      address: 'Marve Road, Malad West',
      landmark: 'Near Mith Chowki Junction',
      ward: 'Ward P/North (Malad)',
      lat: 19.1920,
      lng: 72.8350,
    },
    citizen: { name: 'Jackie Shroff', email: 'jackie.s@example.com', phone: '+91 98200 99999', isAnonymous: false },
    reportedAt: '2026-10-18T16:00:00+05:30',
    deadline: '2026-10-20T16:00:00+05:30',
    progress: 60,
    votes: 77,
    hasVoted: true,
    photos: { before: '/photos/garbage_bins.jpg' },
    timeline: [
      { id: 'tl-518-1', title: 'Debris dumping reported', description: 'JCB backhoe clearing rubble into trucks.', timestamp: '2026-10-18T16:00:00+05:30', actor: 'Jackie Shroff', role: 'Citizen', type: 'reported' }
    ]
  },
  // Kandivali
  {
    id: 'UF-519',
    title: 'Streetlight pole tilted 20 degrees after mini-truck impact',
    description: 'Iron pole leaning towards residential balcony; wire tension severe.',
    category: 'streetlight',
    status: 'in_progress',
    priority: 'critical',
    location: {
      address: 'Mahavir Nagar, Kandivali West',
      landmark: 'Near Pancholia High School',
      ward: 'Ward R/South (Kandivali)',
      lat: 19.2140,
      lng: 72.8420,
    },
    citizen: { name: 'Paresh Rawal', email: 'paresh.r@example.com', phone: '+91 98201 88776', isAnonymous: false },
    reportedAt: '2026-10-20T05:30:00+05:30',
    deadline: '2026-10-20T17:30:00+05:30',
    progress: 40,
    votes: 48,
    hasVoted: false,
    photos: { before: '/photos/streetlight.jpg' },
    timeline: [
      { id: 'tl-519-1', title: 'Tilted pole emergency', description: 'Crane holding pole; base recasting in progress.', timestamp: '2026-10-20T05:30:00+05:30', actor: 'Paresh Rawal', role: 'Citizen', type: 'reported' }
    ]
  },
  // Borivali
  {
    id: 'UF-520',
    title: 'Footpath pavers washed out near National Park Entrance',
    description: 'Monsoon stream washed away sand base; pavers dislodged in deep gully.',
    category: 'footpath',
    status: 'awaiting_verification',
    priority: 'normal',
    location: {
      address: 'Western Express Highway, Borivali East',
      landmark: 'Outside Sanjay Gandhi National Park Gate',
      ward: 'Ward R/Central (Borivali)',
      lat: 19.2280,
      lng: 72.8640,
    },
    citizen: { name: 'Dia Mirza', email: 'dia.m@example.com', phone: '+91 98198 22334', isAnonymous: false },
    reportedAt: '2026-10-17T10:00:00+05:30',
    deadline: '2026-10-20T10:00:00+05:30',
    progress: 100,
    votes: 56,
    hasVoted: true,
    photos: { before: '/photos/broken_paving.jpg', after: '/photos/footpath_after.jpg' },
    timeline: [
      { id: 'tl-520-1', title: 'Footpath rebuilt', description: 'Concrete curb wall constructed and pavers reset.', timestamp: '2026-10-19T17:00:00+05:30', actor: 'Ward R/C Masonry Squad', role: 'Field Worker', type: 'awaiting_verification' }
    ]
  },
  // Kurla
  {
    id: 'UF-521',
    title: 'Burst water distribution line near Phoenix Marketcity',
    description: 'High volume potable pipe fractured under pavement; water flowing into highway lane.',
    category: 'water_leakage',
    status: 'in_progress',
    priority: 'high',
    location: {
      address: 'LBS Marg, Kurla West',
      landmark: 'Near Phoenix Marketcity Mall Entry 2',
      ward: 'Ward L (Kurla, Sakinaka)',
      lat: 19.0880,
      lng: 72.8890,
    },
    citizen: { name: 'Arshad Warsi', email: 'arshad.w@example.com', phone: '+91 98205 66778', isAnonymous: false },
    reportedAt: '2026-10-19T16:30:00+05:30',
    deadline: '2026-10-20T16:30:00+05:30',
    progress: 50,
    votes: 62,
    hasVoted: true,
    photos: { before: '/photos/water_leak_before.jpg' },
    timeline: [
      { id: 'tl-521-1', title: 'Pipeline repair ongoing', description: 'Excavation completed, collar replacement underway.', timestamp: '2026-10-19T16:30:00+05:30', actor: 'Arshad Warsi', role: 'Citizen', type: 'reported' }
    ]
  },
  // Chembur
  {
    id: 'UF-522',
    title: 'Deep pothole on Eastern Freeway Ramp Chembur',
    description: 'High-speed freeway exit ramp has a 10-inch pothole that has caused 3 tire punctures tonight.',
    category: 'pothole',
    status: 'in_progress',
    priority: 'critical',
    location: {
      address: 'Eastern Freeway Ramp, Panjrapol',
      landmark: 'Panjrapol Junction Chembur',
      ward: 'Ward M/West (Chembur)',
      lat: 19.0490,
      lng: 72.9050,
    },
    citizen: { name: 'Vidya Balan', email: 'vidya.b@example.com', phone: '+91 98201 44332', isAnonymous: false },
    reportedAt: '2026-10-19T23:00:00+05:30',
    deadline: '2026-10-20T11:00:00+05:30',
    progress: 60,
    votes: 91,
    hasVoted: true,
    photos: { before: '/photos/pothole_lakeview.jpg' },
    timeline: [
      { id: 'tl-522-1', title: 'Freeway emergency patch', description: 'Traffic police coordinating lane closure.', timestamp: '2026-10-19T23:00:00+05:30', actor: 'Vidya Balan', role: 'Citizen', type: 'reported' }
    ]
  },
  // Ghatkopar
  {
    id: 'UF-523',
    title: 'Choked storm drain grating on R City Mall access road',
    description: 'Fast food paper packaging and plastic bottles completely blocking storm drain.',
    category: 'drain',
    status: 'assigned',
    priority: 'normal',
    location: {
      address: 'LBS Marg, Ghatkopar West',
      landmark: 'Outside R City Mall Gate 3',
      ward: 'Ward N (Ghatkopar)',
      lat: 19.0980,
      lng: 72.9160,
    },
    citizen: { name: 'Kajol Devgn', email: 'kajol.d@example.com', phone: '+91 98200 77112', isAnonymous: false },
    reportedAt: '2026-10-19T13:00:00+05:30',
    deadline: '2026-10-22T13:00:00+05:30',
    progress: 10,
    votes: 31,
    hasVoted: false,
    photos: { before: '/photos/drain_before.jpg' },
    timeline: [
      { id: 'tl-523-1', title: 'Report registered', description: 'Assigned to Ward N drainage crew.', timestamp: '2026-10-19T13:00:00+05:30', actor: 'Kajol Devgn', role: 'Citizen', type: 'reported' }
    ]
  },
  // Powai
  {
    id: 'UF-524',
    title: 'Broken bus stop shelter glass on Central Avenue Powai',
    description: 'Shattered safety glass leaving sharp fragments on waiting platform beside Galleria.',
    category: 'bus_stop',
    status: 'in_progress',
    priority: 'high',
    location: {
      address: 'Central Avenue, Hiranandani, Powai',
      landmark: 'Near Galleria Shopping Mall',
      ward: 'Ward S (Bhandup, Powai)',
      lat: 19.1180,
      lng: 72.9120,
    },
    citizen: { name: 'Ritesh Deshmukh', email: 'ritesh.d@example.com', phone: '+91 98203 88991', isAnonymous: false },
    reportedAt: '2026-10-19T10:00:00+05:30',
    deadline: '2026-10-21T10:00:00+05:30',
    progress: 40,
    votes: 43,
    hasVoted: true,
    photos: { before: '/photos/bus_stop_shelter.jpg' },
    timeline: [
      { id: 'tl-524-1', title: 'Report logged', description: 'Glass fragments vacuumed and frame safeguarded.', timestamp: '2026-10-19T10:00:00+05:30', actor: 'Ritesh Deshmukh', role: 'Citizen', type: 'reported' }
    ]
  },
  // Powai 2
  {
    id: 'UF-525',
    title: 'Commercial vegetable waste dumping near Powai Lake inlet',
    description: 'Decaying refuse polluting water inlet stream feeding Powai lake.',
    category: 'garbage',
    status: 'reported',
    priority: 'high',
    location: {
      address: 'Lake Boulevard, Powai',
      landmark: 'Near Powai Lake Inlet Weir',
      ward: 'Ward S (Bhandup, Powai)',
      lat: 19.1290,
      lng: 72.9100,
    },
    citizen: { name: 'Genelia Dsouza', email: 'genelia.d@example.com', phone: '+91 98204 55112', isAnonymous: false },
    reportedAt: '2026-10-20T08:00:00+05:30',
    deadline: '2026-10-21T08:00:00+05:30',
    progress: 0,
    votes: 38,
    hasVoted: false,
    photos: { before: '/photos/garbage_bins.jpg' },
    timeline: [
      { id: 'tl-525-1', title: 'Pollution report logged', description: 'Awaiting environmental health team review.', timestamp: '2026-10-20T08:00:00+05:30', actor: 'Genelia Dsouza', role: 'Citizen', type: 'reported' }
    ]
  }
];

