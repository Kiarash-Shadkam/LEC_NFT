export interface NFTItem {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  concept: string;
  scientificBasis: string;
  thesisRef: string;
  visualElements: string[];
  status: 'completed' | 'queued' | 'in_progress';
  image?: string;
  aspectRatio: string;
  suggestedPriceEth: string;
  suggestedPriceUsd: string;
  attributes: { trait_type: string; value: string }[];
  descriptionEn: string;
}

export const COLLECTION_INFO = {
  name: "Quantum Engraving Collection",
  symbol: "QEC",
  totalEditions: 10,
  editionType: "1/1 Single Edition per Artwork",
  blockchain: "Polygon / Ethereum",
  standard: "ERC-721",
  creator: "Alireza Mahdipour Shadkam",
  affiliation: "Nanophotonics Group, Faculty of Electrical and Computer Engineering, University of Tabriz",
  supervisors: "Dr. Hamed Baghban (Supervisor), Dr. Hadi Veladi (Advisor)",
  coreThesis: "Modeling and implementation of laser engraving considering the impact of layers material",
  modelingTool: "COMSOL Multiphysics (FEM + ALE Moving Mesh)",
  category: "Science-Inspired Digital Fine Art / 1-of-1 NFTs",
  bannerUrl: "/images/qec_banner.jpg",
  logoUrl: "/images/qec_logo.jpg",
  contractAddressPlaceholder: "0x71C...QEC10",
};

export const ARTWORKS: NFTItem[] = [
  {
    id: "qec-001",
    index: 1,
    title: "Quantum Engraving #001 — Birth of Light",
    subtitle: "The Gaussian Inception",
    concept: "The exact microsecond of laser-matter interaction: a coherent Gaussian Nd:YAG laser pulse impinges onto crystalline silicon, sparking the first transient thermal gradient.",
    scientificBasis: "Gaussian spatial beam profile Q_laser(r,t) and initial thermal conduction without phase degradation.",
    thesisRef: "Chapter 3, Eq. 4-3 (p. 53); Chapter 4, Fig. 1-4 & Diagram 1-4 (pp. 60-61)",
    visualElements: [
      "Focused vertical laser beam descending into mirror-finished silicon",
      "Incandescent golden-white melt nucleus at the focal center",
      "Concentric cyan and sapphire optical diffraction and acoustic shock rings",
      "Pitch-black semiconductor lattice backdrop"
    ],
    status: "completed",
    image: "/images/qec_nft_001.jpg",
    aspectRatio: "1:1",
    suggestedPriceEth: "0.20 ETH",
    suggestedPriceUsd: "~$550",
    attributes: [
      { trait_type: "Material", value: "Single-Crystal Silicon (Si)" },
      { trait_type: "Laser Medium", value: "Nd:YAG Solid-State" },
      { trait_type: "Wavelength", value: "1064 nm" },
      { trait_type: "Spatial Mode", value: "Fundamental Gaussian (TEM00)" },
      { trait_type: "Physical State", value: "Melt Inception (T >= 1687 K)" },
      { trait_type: "Environment", value: "Ambient Air (h = 10 W/m²·K)" },
      { trait_type: "Governing Physics", value: "Transient Heat Transfer & Gaussian Flux" },
      { trait_type: "Scientific Framework", value: "COMSOL Multiphysics ALE Modeling" },
      { trait_type: "Collection Index", value: "001 of 010" },
      { trait_type: "Edition Type", value: "Original 1 of 1" }
    ],
    descriptionEn: "The exact inception of laser-matter interaction: a high-coherence Gaussian Nd:YAG laser beam (λ = 1064 nm) strikes the reflective crystalline plane of a semiconductor silicon substrate. Within microseconds, concentrated photonic absorption initiates a steep transient thermal gradient, creating an incandescent melt core surrounded by concentric photonic diffraction and acoustic ripples propagating into the cold lattice."
  },
  {
    id: "qec-002",
    index: 2,
    title: "Quantum Engraving #002 — Thermal Barrier Surge",
    subtitle: "Oxide Thin-Film Confinement",
    concept: "Thermal accumulation within a 1-5 μm SiO2 thin film. Because SiO2 thermal conductivity is ~100x lower than silicon, intense heat is trapped, causing explosive early surface overheating before structural fracture at 1900 K.",
    scientificBasis: "Low conductivity k_SiO2 = 1.4 W/(m·K), crack temperature T_crack = 1900 K, smoothed Heaviside boundary transition.",
    thesisRef: "Chapter 3, Eq. 1-3 (p. 47); Chapter 4, Fig. 2-4 & Diagram 2-4 (pp. 62-63)",
    visualElements: [
      "Ultra-thin translucent glassy film fracturing over blazing substrate",
      "Intense localized orange-red heat entrapment at the SiO2/Si interface",
      "Micro-cracks propagating in geometric crystal symmetries",
      "Sudden release of trapped thermal flux as the barrier collapses"
    ],
    status: "completed",
    image: "/images/qec_nft_002.jpg",
    aspectRatio: "1:1",
    suggestedPriceEth: "0.22 ETH",
    suggestedPriceUsd: "~$600",
    attributes: [
      { trait_type: "Material", value: "Bilayer Si / SiO2 (1-5 μm Thin Film)" },
      { trait_type: "Laser Medium", value: "Nd:YAG (1064 nm)" },
      { trait_type: "Thermal Conductivity", value: "1.4 W/(m·K) [Barrier Effect]" },
      { trait_type: "Fracture Threshold", value: "1900 K (T_crack)" },
      { trait_type: "Physical State", value: "Sub-Surface Heat Trapping" },
      { trait_type: "Environment", value: "Ambient Air" },
      { trait_type: "Governing Physics", value: "Multilayer Thermal Resistance & Film Cracking" },
      { trait_type: "Collection Index", value: "002 of 010" }
    ],
    descriptionEn: "Confinement of laser energy within a sub-microscopic dielectric oxide layer. With a thermal conductivity 100 times inferior to bare silicon, the SiO2 film acts as an impenetrable thermal insulator, forcing instantaneous superheating and thermal stress buildup until catastrophic mechanical relaxation at 1900 Kelvin."
  },
  {
    id: "qec-003",
    index: 3,
    title: "Quantum Engraving #003 — Recoil Pressure",
    subtitle: "The Downward Shockwave",
    concept: "Upon exceeding the vaporization temperature (3538 K), exiting vapor exerts an intense recoil force up to 0.81 MPa downward on the molten pool, forcefully expelling liquid silicon outward.",
    scientificBasis: "Clausius-Clapeyron recoil equation P_recoil = P_sat(Ts)(1 - P_amb/P_sat); normal boundary stress on moving mesh.",
    thesisRef: "Chapter 2, Eq. 4-2 (p. 20); Chapter 4, Fig. 7-4 & 8-4, Diagram 5-4 & 6-4 (pp. 70-73)",
    visualElements: [
      "Severe parabolic crater depression in the liquid silicon center",
      "High-velocity molten streaks ejected diagonally upward like radiant corona",
      "Deep crimson and white vapor reaction zone at 0.81 MPa pressure peak",
      "Sharp physical vectors of downward reaction momentum"
    ],
    status: "queued",
    aspectRatio: "1:1",
    suggestedPriceEth: "0.25 ETH",
    suggestedPriceUsd: "~$680",
    attributes: [
      { trait_type: "Material", value: "Silicon Melt Pool" },
      { trait_type: "Peak Recoil Pressure", value: "0.81 MPa (8.1 x 10^5 Pa)" },
      { trait_type: "Vaporization Temp", value: "3538 K" },
      { trait_type: "Dynamics", value: "Melt Expulsion & Crater Deepening" },
      { trait_type: "Governing Physics", value: "Clausius-Clapeyron Vapor Momentum Balance" },
      { trait_type: "Collection Index", value: "003 of 010" }
    ],
    descriptionEn: "The tremendous kinetic consequence of surface phase evaporation: as silicon atoms break binding energies at 3538 K, the expanding vapor plume imparts a crushing downward recoil pressure reaching 0.81 Megapascals, carving a crater and violently displacing the liquid boundaries."
  },
  {
    id: "qec-004",
    index: 4,
    title: "Quantum Engraving #004 — Marangoni Vortex",
    subtitle: "The Thermocapillary Stream",
    concept: "Extreme radial temperature gradients across the melt surface trigger surface tension variations (dγ/dT = -1.6e-4 N/m·K), establishing counter-rotating toroidal fluid convection rolls.",
    scientificBasis: "Marangoni shear stress τ = -(dγ/dT) ∇Ts coupled with Navier-Stokes hydrodynamic equations.",
    thesisRef: "Chapter 3, Eq. 8-3 & 9-3 (p. 54); Chapter 4, Fig. 4-4 & 5-4 (pp. 66-67)",
    visualElements: [
      "Luminous swirling vortex ribbons circulating inside the molten silicon bath",
      "Dual counter-rotating streamline flows mapped in glowing teal and gold",
      "Silky liquid metal hydrodynamic curvature along crater walls",
      "Balance between outward recoil velocity and inward surface tension pulls"
    ],
    status: "queued",
    aspectRatio: "1:1",
    suggestedPriceEth: "0.24 ETH",
    suggestedPriceUsd: "~$650",
    attributes: [
      { trait_type: "Material", value: "Liquid Silicon Phase" },
      { trait_type: "Marangoni Coefficient", value: "-1.6 x 10^-4 N/(m·K)" },
      { trait_type: "Flow Regime", value: "Laminar Thermocapillary Vorticity" },
      { trait_type: "Viscosity", value: "0.7 x 10^-4 Pa·s" },
      { trait_type: "Governing Physics", value: "Navier-Stokes & Marangoni Boundary Stress" },
      { trait_type: "Collection Index", value: "004 of 010" }
    ],
    descriptionEn: "The hydrodynamics of liquid silicon governed by thermocapillary forces. As surface tension drops drastically under scorching focal irradiation, surface fluids are pulled radially towards colder peripheries, weaving closed hydrodynamic vortex cells that shape the cavity sidewalls."
  },
  {
    id: "qec-005",
    index: 5,
    title: "Quantum Engraving #005 — Silicon Vapor Plume",
    subtitle: "The 3538K Threshold",
    concept: "The instantaneous transition of silicon into atomic gas at 3538 Kelvin, generating an iridescent expanding gaseous canopy above the engraving site.",
    scientificBasis: "Latent heat of vaporization Lv = 1.278e7 J/kg and surface mass evaporation flux m_dot = Psat / sqrt(2π R Ts).",
    thesisRef: "Chapter 3, Table 3-1 (p. 44); Chapter 4, Fig. 1-4 & Diagram 1-4 (pp. 60-61)",
    visualElements: [
      "Translucent vapor cloud ascending in turbulent plume dynamics",
      "Silver-white gaseous ionization aesthetic hovering above the crater",
      "Atmospheric scattering creating subtle rainbow diffraction fringes",
      "Crisp boundary between liquid pool and vapor dispersal"
    ],
    status: "queued",
    aspectRatio: "1:1",
    suggestedPriceEth: "0.23 ETH",
    suggestedPriceUsd: "~$620",
    attributes: [
      { trait_type: "Material", value: "Silicon Vapor Phase" },
      { trait_type: "Vaporization Enthalpy", value: "1.278 x 10^7 J/kg" },
      { trait_type: "Threshold Temp", value: "3538 K" },
      { trait_type: "Plume Structure", value: "Supersonic Gas Expansion" },
      { trait_type: "Collection Index", value: "005 of 010" }
    ],
    descriptionEn: "The vaporization horizon: beyond 3538 Kelvin, silicon atoms liberate from metallic bonding into an expanding atomic vapor plume, exhibiting celestial iridescence and high-temperature gas dispersion."
  },
  {
    id: "qec-006",
    index: 6,
    title: "Quantum Engraving #006 — Oxide Interface",
    subtitle: "Dielectric Thin-Film Discontinuity",
    concept: "Visual and physical exploration of the sharp boundary between amorphous silicon dioxide (SiO2) and crystalline silicon, revealing optical interference and thermal flux reflection.",
    scientificBasis: "Boundary condition 6: temperature continuity T- = T+ and normal flux step k- ∇T- · n = k+ ∇T+ · n.",
    thesisRef: "Chapter 3, Table 4-3 (p. 58 & 70); Chapter 4, Section 1-1-2-4 (p. 61)",
    visualElements: [
      "Thin prismatic dielectric membrane layered atop reflective metalloid substrate",
      "Thin-film interference colors (magenta, gold, electric cyan) along the rim",
      "Abrupt transition of crystalline atomic arrangement to glassy network",
      "Microscopic depth cross-section aesthetic"
    ],
    status: "queued",
    aspectRatio: "1:1",
    suggestedPriceEth: "0.22 ETH",
    suggestedPriceUsd: "~$600",
    attributes: [
      { trait_type: "Material", value: "Si / SiO2 Heterostructure" },
      { trait_type: "Film Thickness", value: "1.0 - 5.0 μm" },
      { trait_type: "Optical Phenomenon", value: "Thin-Film Constructive Interference" },
      { trait_type: "Interface Physics", value: "Thermal Boundary Resistance (Kapitza)" },
      { trait_type: "Collection Index", value: "006 of 010" }
    ],
    descriptionEn: "The delicate threshold where crystalline semiconductor silicon embraces its transparent native oxide. A visual manifestation of abrupt thermal impedance, optical thin-film interference, and atomic boundary phenomena."
  },
  {
    id: "qec-007",
    index: 7,
    title: "Quantum Engraving #007 — Triple Phase Boundary",
    subtitle: "Solid, Melt, and Gas Coexistence",
    concept: "The instantaneous coexistence of all three states of matter at the laser beam epicenter: cold crystalline solid wafer, incandescent fluid melt pool, and expanding atomic vapor.",
    scientificBasis: "Coupled phase fraction function Lf = flc2hs(T - Tm, 50) and latent heats Lm, Lv in the energy conservation equation.",
    thesisRef: "Chapter 2, Fig. 1-2 (p. 18); Chapter 3, Eq. 3-3 (p. 53)",
    visualElements: [
      "Three distinct topological realms merging in harmonic symmetry",
      "Crisp crystalline solid facet lattice transitioning into swirling lava-like fluid",
      "Luminous vapor mist floating upwards from the incandescent core",
      "Color gradient from deep violet (solid) to molten amber (liquid) and blinding white (vapor)"
    ],
    status: "queued",
    aspectRatio: "1:1",
    suggestedPriceEth: "0.26 ETH",
    suggestedPriceUsd: "~$710",
    attributes: [
      { trait_type: "Physical State", value: "Coexisting Solid-Liquid-Vapor" },
      { trait_type: "Melting Temp", value: "1687 K" },
      { trait_type: "Boiling Temp", value: "3538 K" },
      { trait_type: "Phase Fraction Function", value: "Smoothed Heaviside (ΔT = 50 K)" },
      { trait_type: "Collection Index", value: "007 of 010" }
    ],
    descriptionEn: "A profound thermodynamic intersection: within a span of hundreds of micrometers, the substrate experiences solid rigidity, turbulent molten fluidity, and vaporous sublimation concurrently under intense photon delivery."
  },
  {
    id: "qec-008",
    index: 8,
    title: "Quantum Engraving #008 — Micro Cavity",
    subtitle: "ALE Mesh Topography",
    concept: "The stabilized three-dimensional geometry of the laser-engraved micro-crater (depth 160-231 μm) modeled via Arbitrary Lagrangian-Eulerian (ALE) moving meshes with hyperelastic smoothing.",
    scientificBasis: "Finite Element Method (FEM) mesh deformation, normal boundary velocity vn = -Precoil + k_mesh, and steep sidewall taper.",
    thesisRef: "Chapter 3, Section 3-3-3 (p. 55); Chapter 4, Fig. 10-4 & 11-4 (p. 76)",
    visualElements: [
      "Dramatic 3D axisymmetric conical crater carved cleanly into the substrate",
      "Steep sculpted sidewalls with fine geometric mesh contour line echoes",
      "Smooth parabolic bottom glowing with residual heat",
      "Monumental architectural scale of micro-manufacturing"
    ],
    status: "queued",
    aspectRatio: "1:1",
    suggestedPriceEth: "0.25 ETH",
    suggestedPriceUsd: "~$680",
    attributes: [
      { trait_type: "Hole Depth", value: "160.58 μm (Si) / 231.01 μm (Si/SiO2)" },
      { trait_type: "Numerical Method", value: "Arbitrary Lagrangian-Eulerian (ALE)" },
      { trait_type: "Mesh Smoothing", value: "Hyperelastic Regularization" },
      { trait_type: "Aspect Ratio", value: "High Aspect Conical Taper" },
      { trait_type: "Collection Index", value: "008 of 010" }
    ],
    descriptionEn: "The sculpted architecture of photonics: an engraved conical cavity reaching depths of over 200 micrometers. A testament to numerical moving-mesh mathematics and non-destructive surface reformation."
  },
  {
    id: "qec-009",
    index: 9,
    title: "Quantum Engraving #009 — Submerged Quench",
    subtitle: "Underwater Cavitation & Clean Ablation",
    concept: "Laser engraving under a water film: catastrophic convective cooling (h = 1000 W/m²·K), hydro-acoustic cavitation bubbles, complete suppression of recast debris, and pristine shallow cavity formation.",
    scientificBasis: "Liquid water environment: df = 5 μm, h = 1000 W/(m²·K), hydrostatic/dynamic pressure, crater depth constrained to 23.48 μm.",
    thesisRef: "Chapter 3, Table 3-3 (p. 49); Chapter 4, Fig. 6-4 & 9-4, Fig. 12-4 (pp. 69, 74, 77)",
    visualElements: [
      "Crystalline aquatic immersion with iridescent cavitation bubbles hovering above the crater",
      "Stark contrast between cool sapphire blue water and radiant submerged laser beam",
      "Pristine, debris-free glassy crater rim without recast spatter",
      "Acoustic bubble collapse shockwaves diffusing in water"
    ],
    status: "queued",
    aspectRatio: "1:1",
    suggestedPriceEth: "0.28 ETH",
    suggestedPriceUsd: "~$760",
    attributes: [
      { trait_type: "Environment", value: "Liquid Water (h = 1000 W/m²·K)" },
      { trait_type: "Fluid Layer Thickness", value: "5 μm" },
      { trait_type: "Cavity Depth", value: "23.48 μm (Controlled Ablation)" },
      { trait_type: "Recast Ridge Height", value: "10.68 μm (Debris-Suppressed)" },
      { trait_type: "Phenomenon", value: "Hydrodynamic Cavitation & Rapid Quenching" },
      { trait_type: "Collection Index", value: "009 of 010" }
    ],
    descriptionEn: "Fire subdued by water: performing laser engraving submerged beneath a micro-layer of water provides a 1000 W/m²·K thermal heatsink. Hydrodynamic cavitation sweeps away expelled melt, yielding immaculate, debris-free micro-features."
  },
  {
    id: "qec-010",
    index: 10,
    title: "Quantum Engraving #010 — Recast Crest",
    subtitle: "Molten Ridge & Re-solidification",
    concept: "The final cooling and solidification: expelled molten silicon gathers at the cavity rim, freezing into an elevated circular crest up to 156.94 μm tall, recording the hydrodynamic pulse history.",
    scientificBasis: "Solidification and rim accumulation; recast ridge height 106.4 μm (pure Si) vs. 156.94 μm (Si/SiO2 bilayer in air).",
    thesisRef: "Chapter 4, Table 4-1 (p. 77); Chapter 4, Fig. 10-4 & 11-4 (p. 76)",
    visualElements: [
      "Towering frozen waves of metallic crystalline silicon crowning the crater aperture",
      "Iridescent cooling temper colors across the re-crystallized ridges",
      "Micro-terraces and ripples solidified in mid-motion",
      "Dramatic oblique lighting casting long shadows across the wafer"
    ],
    status: "queued",
    aspectRatio: "1:1",
    suggestedPriceEth: "0.30 ETH",
    suggestedPriceUsd: "~$820",
    attributes: [
      { trait_type: "Recast Ridge Height", value: "156.94 μm (Si/SiO2) / 106.4 μm (Si)" },
      { trait_type: "Cooling Rate", value: "Rapid Non-Equilibrium Solidification" },
      { trait_type: "Morphology", value: "Hydrodynamic Annular Crest" },
      { trait_type: "Final State", value: "Permanent Topographical Relic" },
      { trait_type: "Collection Index", value: "010 of 010" }
    ],
    descriptionEn: "The permanent monument to a transient storm: as laser illumination ceases, expelled liquid silicon freezes into towering annular ridges over 150 micrometers tall, capturing the violent hydrodynamics in permanent crystal."
  }
];

export const THESIS_DATA_TABLES = {
  siliconProperties: [
    { property: "Density (ρ)", value: "2330 kg/m³", note: "Approx. constant 300K - 1687K" },
    { property: "Melting Temperature (Tm)", value: "1687 K", note: "Solid to liquid transition" },
    { property: "Vaporization Temperature (Tv)", value: "3538 K", note: "Threshold of recoil ablation" },
    { property: "Latent Heat of Fusion (Lm)", value: "1.8 × 10⁶ J/kg", note: "Energy required for melting" },
    { property: "Latent Heat of Vaporization (Lv)", value: "1.278 × 10⁷ J/kg", note: "Energy required for boiling" },
    { property: "Thermal Expansion Coeff. (α)", value: "2.6 × 10⁻⁶ K⁻¹", note: "Linear increase up to Tm" },
    { property: "Refractive Index (n)", value: "3.5", note: "At λ = 1064 nm" },
    { property: "Laser Absorption Coeff. (A)", value: "0.7 - 0.8", note: "Dependent on temp & wavelength" },
    { property: "Melt Dynamic Viscosity (μ)", value: "0.7 × 10⁻⁴ Pa·s", note: "In liquid phase (T > Tm)" },
    { property: "Surface Tension Gradient (dγ/dT)", value: "-1.6 × 10⁻⁴ N/(m·K)", note: "Marangoni driving parameter" }
  ],
  simulationScenarios: [
    {
      scenario: "Single Layer Silicon (Si)",
      medium: "Ambient Air",
      craterDepth: "160.58 μm",
      recastHeight: "106.4 μm",
      maxPressure: "5.67 × 10⁵ Pa",
      vaporizationOnset: "0.245 ms",
      features: "Uniform depth growth, balanced recoil expulsion"
    },
    {
      scenario: "Double Layer (Si / SiO₂)",
      medium: "Ambient Air",
      craterDepth: "231.01 μm",
      recastHeight: "156.94 μm",
      maxPressure: "8.1 × 10⁵ Pa",
      vaporizationOnset: "0.05 ms (0.2 ms earlier)",
      features: "Thermal barrier traps heat, early superheating, higher melt peaks"
    },
    {
      scenario: "Single Layer Silicon (Si)",
      medium: "Liquid Water",
      craterDepth: "23.48 μm",
      recastHeight: "10.68 μm",
      maxPressure: "Controlled (~8.1 × 10⁵ Pa)",
      vaporizationOnset: "2.5 ms (delayed by cooling)",
      features: "High convective cooling (h=1000), cavitation, debris-free smooth crater"
    }
  ],
  pulseWidthComparison: [
    { pulseWidth: "0.3 ms", depth: "421.67 μm", recastHeight: "175.65 μm", note: "Highest peak intensity, aggressive deep penetration" },
    { pulseWidth: "0.5 ms", depth: "160.58 μm", recastHeight: "106.4 μm", note: "Nominal baseline condition" },
    { pulseWidth: "0.7 ms", depth: "116.7 μm", recastHeight: "69.54 μm", note: "Gentler heating, shallower cavity, lower recast" }
  ]
};
