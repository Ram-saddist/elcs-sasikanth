export const demoProducts = [
  {
    id: 9,
    name: "Voltage Divider Calculator",
    title: "Voltage Divider Calculator – Formula, Theory & Online Tool",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
    fullDescription: "A voltage divider is a simple and widely used electronic circuit that reduces a higher input voltage to a lower output voltage using two resistors connected in series.",
    theory: {
      whatIs: "A voltage divider is a simple and widely used electronic circuit that reduces a higher input voltage to a lower output voltage using two resistors connected in series.",
      commonUses: [
        "Signal level reduction",
        "ADC input scaling (microcontrollers)",
        "Sensor interfacing",
        "Reference voltage generation"
      ],
      howItWorks: [
        "In a voltage divider, the same current flows through both resistors because they are in series.",
        "The voltage drop across each resistor depends on its resistance value.",
        "Higher resistance → higher voltage drop",
        "Lower resistance → lower voltage drop",
        "By choosing proper resistor values, we can get the desired output voltage."
      ],
      formulaVariables: [
        { symbol: "Vin", description: "Input Voltage (V)" },
        { symbol: "Vout", description: "Output Voltage (V)" },
        { symbol: "R1, R2", description: "Resistor values (Ω)" }
      ]
    },
    features: ["Calculate Vout from Vin, R1, R2", "Calculate Vin from Vout, R1, R2", "Calculate R1 from Vin, Vout, R2", "Calculate R2 from Vin, Vout, R1", "Real-time calculation"],
    specifications: { "Formula": "Vout = Vin × (R2 / (R1 + R2))", "Inputs": "Vin, R1, R2, Vout", "Output": "Unknown value", "Precision": "Up to 6 decimal places", "Units": "Volts, Ohms" },
    hasCalculator: true,
    calculatorType: "voltage-divider"
  },
  {
    id: 2,
    name: "Resistor Color Code Calculator",
    title: "Resistor Color Code Calculator – Decode Resistor Values Instantly",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
    fullDescription: "The Resistor Color Code Calculator helps you quickly identify resistor values from their color bands. Simply select the colors and get the resistance value with tolerance. You can also reverse calculate - enter a resistance value and get the corresponding color code. Supports 4-band, 5-band, and 6-band resistors including temperature coefficient for precision resistors.",
    theory: {
      whatIs: "Resistor color codes are a standardized system of colored bands painted on resistors to indicate their resistance value, tolerance, and sometimes temperature coefficient. This system allows quick identification without needing measuring equipment.",
      commonUses: [
        "Quick resistor identification in circuits",
        "Verifying component values during assembly",
        "Selecting correct replacement resistors",
        "Educational and learning purposes"
      ],
      howItWorks: [
        "Each color represents a specific digit (0-9) or multiplier value",
        "4-band resistors: 1st digit + 2nd digit + multiplier + tolerance",
        "5-band resistors: 1st digit + 2nd digit + 3rd digit + multiplier + tolerance",
        "6-band resistors: 3 digits + multiplier + tolerance + temperature coefficient",
        "Read bands from left to right, starting from the band closest to one end"
      ],
      formulaVariables: [
        { symbol: "D1", description: "First color band value (0-9)" },
        { symbol: "D2", description: "Second color band value (0-9)" },
        { symbol: "Multiplier", description: "Power of 10 (×1, ×10, ×100, etc.)" },
        { symbol: "Tolerance", description: "Accuracy range (±%)" }
      ],
      formulas: {
        fourBand: "Resistance = (D1 × 10 + D2) × Multiplier",
        fiveBand: "Resistance = (D1 × 100 + D2 × 10 + D3) × Multiplier"
      }
    },
    features: ["4, 5, and 6-band support", "Reverse color code lookup", "Tolerance calculation", "Temperature coefficient (6-band)", "Visual resistor display"],
    specifications: { "Band Types": "4, 5, 6 bands", "Range": "0.1Ω - 99MΩ", "Tolerance": "±0.05% to ±20%", "Temp Coefficient": "Available for 6-band", "Output": "Resistance, Tolerance" },
    hasCalculator: true,
    calculatorType: "resistor-color"
  },
  {
    id: 4,
    name: "Series & Parallel Resistor Calculator",
    title: "Series & Parallel Resistor Calculator – Find Equivalent Resistance",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    fullDescription: "The Series and Parallel Resistor Calculator computes the equivalent resistance for any combination of resistors. For series connections, resistances simply add up. For parallel connections, the calculator uses the reciprocal formula. You can add multiple resistors and see real-time results. Perfect for circuit design and troubleshooting.",
    theory: {
      whatIs: "In electronic circuits, resistors can be connected in series, parallel, or a combination of both. These configurations are used to control current, adjust resistance, and distribute voltage according to circuit requirements.",
      commonUses: [
        "Circuit design and analysis",
        "Power distribution",
        "Current limiting",
        "Sensor and signal conditioning",
        "Load balancing"
      ],
      series: {
        description: "In a series connection, resistors are connected end-to-end, so the same current flows through all resistors.",
        characteristics: [
          "Same current through all resistors",
          "Total resistance increases",
          "Voltage divides across resistors"
        ],
        formula: "R_total = R₁ + R₂ + R₃ + ..."
      },
      parallel: {
        description: "In a parallel connection, all resistors are connected across the same two points, so the voltage across each resistor is the same.",
        characteristics: [
          "Same voltage across all resistors",
          "Total resistance decreases",
          "Current divides between resistors"
        ],
        formula: "1/R_total = 1/R₁ + 1/R₂ + 1/R₃ + ...",
        twoResistorFormula: "R_total = (R₁ × R₂) / (R₁ + R₂)"
      },
      rules: [
        "Series resistance is always greater than the largest resistor",
        "Parallel resistance is always smaller than the smallest resistor",
        "Use series resistors to increase resistance",
        "Use parallel resistors to reduce resistance or increase current capacity"
      ]
    },
    features: ["Series calculation", "Parallel calculation", "Multiple resistor support", "Add/remove resistors", "Visual circuit diagram"],
    specifications: { "Series": "Rtotal = R1 + R2 + ... + Rn", "Parallel": "1/Rt = 1/R1 + 1/R2 + ... + 1/Rn", "Max Resistors": "Up to 10", "Units": "Ω, kΩ, MΩ", "Output": "Equivalent resistance" },
    hasCalculator: true,
    calculatorType: "series-parallel"
  },
  {
    id: 5,
    name: "RC Low Pass & High Pass Filter Calculator",
    title: "RC Low-Pass & High-Pass Filter Calculator – Design RC Filters",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    fullDescription: "The RC Filter Calculator helps you design passive first-order filters. For low-pass filters, frequencies below the cutoff pass through while higher frequencies are attenuated. High-pass filters do the opposite. Enter any two values (R, C, or cutoff frequency) and calculate the third. Includes frequency response visualization.",
    theory: {
      whatIs: "An RC filter is a basic analog circuit made using a resistor (R) and a capacitor (C). It is used to control which frequencies pass through a circuit and which are blocked. RC filters are simple, low-cost, and widely used in electronic systems.",
      commonUses: [
        "Noise reduction",
        "Signal smoothing",
        "Audio processing",
        "Sensor signal filtering",
        "ADC input conditioning"
      ],
      lowPass: {
        description: "A Low-Pass Filter (LPF) allows low-frequency signals to pass and attenuates high-frequency signals. It is mainly used to remove high-frequency noise from signals.",
        circuit: "Resistor R connected in series with input, Capacitor C connected from output to ground. Output voltage taken across the capacitor.",
        uses: ["Removing noise from sensor signals", "Smoothing PWM signals to analog voltage", "Audio bass filtering", "ADC input protection"]
      },
      highPass: {
        description: "A High-Pass Filter (HPF) allows high-frequency signals to pass and blocks low-frequency (DC) signals. It is commonly used to remove DC offset and slow variations.",
        circuit: "Capacitor C connected in series with input, Resistor R connected from output to ground. Output voltage taken across the resistor.",
        uses: ["Removing DC offset", "Audio treble filtering", "Signal coupling between stages", "Vibration and motion sensing"]
      },
      formula: "fc = 1 / (2πRC)",
      variables: [
        { symbol: "R", description: "Resistance (Ω)" },
        { symbol: "C", description: "Capacitance (F)" },
        { symbol: "fc", description: "Cutoff Frequency (Hz)" }
      ],
      notes: [
        "RC filters are first-order filters",
        "Attenuation rate is 20 dB/decade",
        "Cutoff frequency depends on both R and C",
        "Output amplitude changes gradually, not suddenly",
        "At cutoff frequency, output voltage drops to 70.7% of input"
      ]
    },
    features: ["Low-pass filter design", "High-pass filter design", "Cutoff frequency calculation", "Component value calculation", "Frequency response graph"],
    specifications: { "Formula": "fc = 1 / (2πRC)", "Rolloff": "-20dB/decade", "Frequency Range": "0.1Hz - 10MHz", "Components": "Resistor, Capacitor", "Output": "Cutoff frequency, R, C values" },
    hasCalculator: true,
    calculatorType: "rc-filter"
  },
  {
    id: 6,
    name: "Ohm's Law Calculator",
    title: "Ohm's Law Calculator – Voltage, Current & Resistance",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=600&fit=crop",
    fullDescription: "The Ohm's Law Calculator is a fundamental electronics tool that applies V = IR and P = VI relationships. Enter any two known values (voltage, current, resistance, or power) and instantly calculate the remaining values. Essential for circuit analysis, component selection, and electrical troubleshooting.",
    theory: {
      whatIs: "Ohm's Law is one of the most fundamental rules in electronics. It defines the relationship between Voltage (V), Current (I), and Resistance (R) in an electrical circuit. It states that the current flowing through a conductor is directly proportional to the voltage applied and inversely proportional to the resistance.",
      commonUses: [
        "Selecting resistor values for LEDs",
        "Calculating current consumption",
        "Power supply design",
        "Circuit troubleshooting",
        "Battery and load calculations"
      ],
      formulas: {
        voltage: "V = I × R",
        current: "I = V / R",
        resistance: "R = V / I"
      },
      variables: [
        { symbol: "V", description: "Voltage (Volts, V)" },
        { symbol: "I", description: "Current (Amperes, A)" },
        { symbol: "R", description: "Resistance (Ohms, Ω)" }
      ],
      examples: [
        { title: "Find Current", given: "V = 12V, R = 6Ω", formula: "I = V/R = 12/6", result: "2 A" },
        { title: "Find Voltage", given: "I = 0.5A, R = 10Ω", formula: "V = I × R = 0.5 × 10", result: "5 V" },
        { title: "Find Resistance", given: "V = 9V, I = 0.3A", formula: "R = V/I = 9/0.3", result: "30 Ω" }
      ],
      notes: [
        "Ohm's Law applies to linear components (resistors)",
        "It does not directly apply to diodes, transistors, or ICs",
        "Excess current can damage components",
        "Always check power rating of resistors"
      ]
    },
    features: ["Voltage calculation (V = IR)", "Current calculation (I = V/R)", "Resistance calculation (R = V/I)", "Power calculation (P = VI)", "All formulas in one tool"],
    specifications: { "Ohm's Law": "V = I × R", "Power": "P = V × I = I²R = V²/R", "Voltage Range": "mV to kV", "Current Range": "μA to kA", "Output": "V, I, R, P values" },
    hasCalculator: true,
    calculatorType: "ohms-law"
  },
  {
    id: 7,
    name: "Capacitor Charge Time & RC Time Constant",
    title: "Capacitor Charging Calculator – RC Time Constant & Voltage",
    image: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?w=800&h=600&fit=crop",
    fullDescription: "When a capacitor is connected to a voltage source through a resistor, it does not charge instantly. Instead, the voltage across the capacitor increases gradually over time. This calculator determines the RC time constant (τ), capacitor voltage at any time t, and shows the charging behavior of the RC circuit.",
    theory: {
      whatIs: "When a capacitor is connected to a voltage source through a resistor, it does not charge instantly. Instead, the voltage across the capacitor increases gradually over time. This charging behavior depends on the resistance (R), the capacitance (C), and the applied voltage (Vin). The rate at which the capacitor charges is determined by the Time Constant (τ).",
      commonUses: [
        "Timer circuits (like 555 timer)",
        "Power-on delay circuits",
        "Signal filtering",
        "Debouncing circuits",
        "Analog waveform generation",
        "Soft start circuits"
      ],
      howItWorks: [
        "A resistor (R) is connected in series with a capacitor (C)",
        "Input voltage (Vin) is applied across R + C",
        "Output is taken across the capacitor",
        "The capacitor charges gradually following an exponential curve",
        "After 5 time constants (5τ), the capacitor is considered fully charged (~99.3%)"
      ],
      formulaVariables: [
        { symbol: "Vc(t)", description: "Capacitor voltage at time t (V)" },
        { symbol: "Vin", description: "Input Voltage (V)" },
        { symbol: "R", description: "Resistance (Ω)" },
        { symbol: "C", description: "Capacitance (F)" },
        { symbol: "t", description: "Time (seconds)" },
        { symbol: "τ (Tau)", description: "Time Constant = R × C (seconds)" },
        { symbol: "e", description: "Euler's constant (2.718)" }
      ],
      chargingTable: [
        { time: "1τ", voltage: "63.2% of Vin" },
        { time: "2τ", voltage: "86.5% of Vin" },
        { time: "3τ", voltage: "95.0% of Vin" },
        { time: "4τ", voltage: "98.2% of Vin" },
        { time: "5τ", voltage: "99.3% (Fully charged)" }
      ],
      workedExample: {
        given: "Vin = 5V, R = 10kΩ, C = 100µF",
        step1: { label: "Calculate Time Constant", formula: "τ = R × C = 10,000 × 0.0001 = 1 second" },
        step2: { label: "Voltage after 1 second (1τ)", formula: "Vc = 5 × (1 - e⁻¹) = 5 × (1 - 0.368) ≈ 3.16V" },
        conclusion: "After 1 second, the capacitor reaches ~63% of 5V (3.16V). After 5 seconds (5τ), it is almost fully charged (~5V)."
      }
    },
    features: ["Time constant (τ) calculation", "Capacitor voltage at any time t", "Charging time table (1τ to 5τ)", "Worked example with step-by-step", "Interactive RC charging calculator"],
    specifications: { "Time Constant": "τ = R × C", "Charging Formula": "Vc(t) = Vin × (1 - e^(-t/RC))", "Full Charge": "~5τ (99.3%)", "At 1τ": "63.2% of Vin", "Output": "τ, Vc(t), charging table" },
    hasCalculator: true,
    calculatorType: "capacitor-charging"
  },
  {
    id: 8,
    name: "PCB Trace Width & Current Calculator",
    title: "PCB Trace Width Calculator – IPC-2221 Current & Width Tool",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    fullDescription: "PCB trace width is the width of the copper track on a printed circuit board that carries electrical current. If the trace is too thin for the current, it will heat up, voltage drop increases, copper may burn, and PCB reliability reduces. Choosing the correct trace width is important for safe and stable circuit operation.",
    theory: {
      whatIs: "PCB trace width is the width of the copper track on a printed circuit board that carries electrical current. If the trace is too thin, it heats up, voltage drop increases, and copper may burn. If the trace is wider, there is less heating, lower resistance, and better reliability. Choosing the correct trace width is critical for safe and stable circuit operation.",
      commonUses: [
        "Power supply PCB design",
        "Battery-powered devices",
        "Motor driver circuits",
        "LED power circuits",
        "DC-DC converter layouts"
      ],
      howItWorks: [
        "Current flowing through the trace determines minimum width needed",
        "Copper thickness (oz/ft²) affects current-carrying capacity",
        "Allowed temperature rise (°C) sets the thermal limit",
        "External layers dissipate heat better than internal layers",
        "IPC-2221 standard provides conservative, reliable calculations"
      ],
      formulaVariables: [
        { symbol: "I", description: "Current (Amps)" },
        { symbol: "ΔT", description: "Temperature rise (°C)" },
        { symbol: "A", description: "Cross-sectional area (mil²)" },
        { symbol: "k", description: "Layer constant (0.048 external, 0.024 internal)" },
        { symbol: "W", description: "Trace width (mil or mm)" },
        { symbol: "T", description: "Copper thickness (mil)" }
      ],
      copperReference: [
        { weight: "1 oz", thickness: "35 µm (1.378 mil)" },
        { weight: "2 oz", thickness: "70 µm (2.756 mil)" },
        { weight: "3 oz", thickness: "105 µm (4.134 mil)" }
      ],
      designTips: [
        "Always add 20–30% safety margin to calculated width",
        "Use polygon/copper pour for high current paths",
        "For >5A, consider using parallel traces",
        "Keep high-current traces as short as possible",
        "IPC-2221 gives conservative values — real results depend on airflow and PCB stackup"
      ],
      workedExample: {
        given: "Current = 2A, Copper = 1 oz, Temp Rise = 10°C, External layer",
        step1: { label: "Calculate cross-sectional area from IPC formula", formula: "A = (I / (k × ΔT^0.44))^(1/0.725) = (2 / (0.048 × 10^0.44))^(1/0.725) ≈ 66.2 mil²" },
        step2: { label: "Calculate trace width", formula: "Width = A / Thickness = 66.2 / 1.378 ≈ 48 mil ≈ 1.22 mm" },
        conclusion: "For 2A on an external 1oz copper layer with 10°C rise, you need approximately 1.22 mm (48 mil) trace width."
      }
    },
    features: ["IPC-2221 compliant calculations", "Internal & external layer support", "Trace width from current (and reverse)", "Resistance per cm estimation", "Auto unit conversion (mil ↔ mm)"],
    specifications: { "Standard": "IPC-2221", "Formula": "I = k × ΔT^0.44 × A^0.725", "Copper Weights": "1oz, 2oz, 3oz", "Temp Rise": "5°C - 100°C", "Output": "Width (mm/mil), Area, Resistance" },
    hasCalculator: true,
    calculatorType: "pcb-trace"
  },
  {
    id: 10,
    name: "Battery Life Calculator",
    title: "Battery Life Calculator – Estimate Runtime for Any Device",
    image: "https://images.unsplash.com/photo-1619641805634-98e9cb58a3b3?w=800&h=600&fit=crop",
    fullDescription: "Battery life is the estimated amount of time a battery can power a device before it needs recharging or replacement. It depends on battery capacity, load current consumption, operating conditions, and circuit efficiency. This calculator helps estimate how long your device will run on a given battery.",
    theory: {
      whatIs: "Battery life is the estimated amount of time a battery can power a device before it needs recharging or replacement. It depends on battery capacity (mAh or Ah), load current consumption (mA or A), operating conditions, and efficiency of the circuit. This calculator helps estimate runtime for both continuous and duty-cycled loads.",
      commonUses: [
        "ESP8266 / ESP32 projects",
        "IoT sensor nodes",
        "GPS trackers",
        "Portable devices",
        "Wireless sensors",
        "R&D prototypes"
      ],
      howItWorks: [
        "Battery capacity (mAh) divided by load current (mA) gives runtime in hours",
        "Real batteries are not 100% efficient — an efficiency factor (70–90%) is applied",
        "For duty-cycled devices, average current is calculated from active and sleep periods",
        "Battery chemistry affects nominal voltage and discharge behavior",
        "Higher discharge rates reduce effective capacity"
      ],
      formulaVariables: [
        { symbol: "Capacity", description: "Battery capacity (mAh or Ah)" },
        { symbol: "I_load", description: "Load current (mA or A)" },
        { symbol: "η (Efficiency)", description: "Battery efficiency factor (0.7–0.9)" },
        { symbol: "I_active", description: "Active mode current (mA)" },
        { symbol: "T_active", description: "Active time per cycle (seconds)" },
        { symbol: "I_sleep", description: "Sleep mode current (mA)" },
        { symbol: "T_sleep", description: "Sleep time per cycle (seconds)" },
        { symbol: "I_avg", description: "Weighted average current (mA)" }
      ],
      batteryChemistry: [
        { type: "Li-ion", voltage: "3.7V nominal (4.2V full)", notes: "Most common for portable devices" },
        { type: "Lead-acid", voltage: "2.0V per cell (12V battery)", notes: "Used in UPS, vehicles" },
        { type: "LiFePO4", voltage: "3.2V nominal", notes: "Safer, longer cycle life" },
        { type: "NiMH", voltage: "1.2V per cell", notes: "Rechargeable AA/AAA" }
      ],
      engineeringNotes: [
        "Li-ion nominal voltage = 3.7V, full charge = 4.2V",
        "Capacity reduces at high discharge current (C-rate)",
        "Temperature affects battery performance significantly",
        "Always add 20–30% safety margin to estimated runtime",
        "Deep discharge shortens battery cycle life"
      ],
      workedExample: {
        given: "Battery = 2000 mAh, Load Current = 200 mA",
        step1: { label: "Basic battery life", formula: "Battery Life = 2000 / 200 = 10 hours" },
        step2: { label: "With 85% efficiency", formula: "Battery Life = (2000 × 0.85) / 200 = 8.5 hours" },
        conclusion: "The device will run approximately 8.5 hours with efficiency losses accounted for."
      },
      iotExample: {
        given: "Active: 80mA × 5s, Sleep: 0.05mA × 55s, Cycle: 60s, Battery: 2000mAh",
        step1: { label: "Calculate average current", formula: "I_avg = (80 × 5 + 0.05 × 55) / 60 ≈ 6.7 mA" },
        step2: { label: "Calculate battery life", formula: "Life = 2000 / 6.7 ≈ 298 hours ≈ 12.4 days" },
        conclusion: "Using duty cycling, the same 2000mAh battery lasts ~12 days instead of just 10 hours!"
      }
    },
    features: ["Basic & advanced (IoT) modes", "Efficiency factor support", "Duty cycle average current", "Battery chemistry selection", "Power consumption in Watts & Wh"],
    specifications: { "Basic Formula": "Life = Capacity / Current", "Advanced": "Life = (Capacity × η) / I_avg", "Avg Current": "I_avg = (I_act×T_act + I_slp×T_slp) / T_total", "Capacity Units": "mAh, Ah", "Output": "Hours, days, power (W, Wh)" },
    hasCalculator: true,
    calculatorType: "battery-life"
  },
  {
    id: 11,
    name: "Op-Amp Voltage & Gain Calculator",
    title: "Op-Amp Voltage Amplifier & Gain Calculator – Inverting & Non-Inverting",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&h=600&fit=crop",
    fullDescription: "An Operational Amplifier (Op-Amp) is a high-gain voltage amplifier used to amplify small input signals. It amplifies the difference between its two input terminals: Non-inverting (+) and Inverting (–). This calculator covers inverting and non-inverting amplifier configurations with gain, output voltage, and dB calculations.",
    theory: {
      whatIs: "An Operational Amplifier (Op-Amp) is a high-gain voltage amplifier used to amplify small input signals. It amplifies the difference between its two input terminals — the non-inverting (+) and inverting (–) inputs. Op-amps are fundamental building blocks in analog electronics.",
      commonUses: [
        "Sensor signal conditioning",
        "Audio amplification & microphone preamps",
        "ADC signal scaling",
        "Active filters",
        "Voltage buffering",
        "Signal conditioning circuits"
      ],
      howItWorks: [
        "Inverting amplifier: input applied to (–) terminal, output is 180° phase shifted",
        "Non-inverting amplifier: input applied to (+) terminal, output is in phase",
        "Gain is set by external resistor ratio (Rf and Rin or Rg)",
        "Output voltage cannot exceed the supply rails (Vcc+ and Vcc–)",
        "Bandwidth reduces at higher gain (Gain-Bandwidth Product)"
      ],
      formulaVariables: [
        { symbol: "Av", description: "Voltage Gain (dimensionless ratio)" },
        { symbol: "Rf", description: "Feedback Resistor (Ω)" },
        { symbol: "Rin", description: "Input Resistor — inverting config (Ω)" },
        { symbol: "Rg", description: "Ground Resistor — non-inverting config (Ω)" },
        { symbol: "Vin", description: "Input Voltage (V)" },
        { symbol: "Vout", description: "Output Voltage (V)" },
        { symbol: "Gain (dB)", description: "20 × log₁₀(|Av|)" }
      ],
      inverting: {
        description: "In the inverting configuration, the input signal is applied to the inverting terminal (–) through an input resistor (Rin). The feedback resistor (Rf) connects the output back to the inverting terminal. The non-inverting terminal (+) is connected to ground.",
        gainFormula: "Av = –Rf / Rin",
        outputFormula: "Vout = –(Rf / Rin) × Vin",
        circuit: ["Vin → Rin → (–) terminal", "Rf from Output to (–) terminal", "(+) terminal connected to Ground"]
      },
      nonInverting: {
        description: "In the non-inverting configuration, the input signal is applied directly to the non-inverting terminal (+). The feedback resistor (Rf) connects the output to the inverting terminal (–), and a ground resistor (Rg) connects the inverting terminal to ground.",
        gainFormula: "Av = 1 + (Rf / Rg)",
        outputFormula: "Vout = (1 + Rf / Rg) × Vin",
        circuit: ["Vin → (+) terminal", "Rf from Output to (–) terminal", "Rg from (–) terminal to Ground"]
      },
      practicalNotes: [
        "Output voltage cannot exceed supply voltage (rail clipping)",
        "Rail-to-rail op-amps needed for 3.3V systems",
        "Bandwidth reduces at high gain (GBP = Gain × Bandwidth)",
        "Slew rate limits high-frequency signals",
        "Always add decoupling capacitors near supply pins"
      ],
      workedExamples: {
        inverting: {
          given: "Vin = 1V, Rin = 10kΩ, Rf = 100kΩ (Inverting)",
          step1: { label: "Calculate Gain", formula: "Av = –Rf / Rin = –100k / 10k = –10" },
          step2: { label: "Calculate Output Voltage", formula: "Vout = –10 × 1V = –10V (limited by supply rails)" },
          conclusion: "The inverting amplifier gives a gain of –10 with 180° phase inversion."
        },
        nonInverting: {
          given: "Vin = 0.5V, Rf = 90kΩ, Rg = 10kΩ (Non-Inverting)",
          step1: { label: "Calculate Gain", formula: "Av = 1 + Rf/Rg = 1 + 90k/10k = 1 + 9 = 10" },
          step2: { label: "Calculate Output Voltage", formula: "Vout = 10 × 0.5V = 5V" },
          conclusion: "The non-inverting amplifier gives a gain of +10 with no phase inversion."
        }
      }
    },
    features: ["Inverting & non-inverting modes", "Voltage gain (Av) calculation", "Gain in dB", "Output voltage calculation", "Supply rail clipping warning"],
    specifications: { "Inverting Gain": "Av = –Rf / Rin", "Non-Inverting": "Av = 1 + Rf / Rg", "Gain in dB": "20 × log₁₀(|Av|)", "Output": "Vout = Gain × Vin", "Clipping": "Supply rail warning" },
    hasCalculator: true,
    calculatorType: "opamp-gain"
  },
  {
    id: 12,
    name: "555 Timer Circuit & Delay Calculator",
    title: "555 Timer Calculator – Monostable & Astable Mode Design Tool",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop",
    fullDescription: "The 555 Timer is a very popular and versatile timer IC used to generate time delays, square wave oscillations, PWM signals, and pulse generation. It works based on RC (Resistor-Capacitor) charging and discharging. This calculator covers both Monostable (one-shot delay) and Astable (continuous oscillation) modes.",
    theory: {
      whatIs: "The 555 Timer is a very popular and versatile timer IC used to generate time delays, square wave oscillations, PWM signals, pulse generation, and LED flashing circuits. It works based on RC (Resistor-Capacitor) charging and discharging, and operates in two main modes: Monostable (one-shot pulse) and Astable (continuous oscillation).",
      commonUses: [
        "Power-on delay circuits",
        "Push-button timers",
        "LED blinker / flasher circuits",
        "Tone and frequency generators",
        "PWM signal generation",
        "Relay delay and auto switch-off"
      ],
      howItWorks: [
        "Monostable: generates a single timed pulse when triggered (one-shot)",
        "Astable: generates a continuous square wave (oscillator)",
        "Timing is set by external resistor(s) and capacitor values",
        "RC charging determines HIGH time, RC discharging determines LOW time",
        "Output is at Pin 3, can drive LEDs, relays (via transistor), buzzers"
      ],
      formulaVariables: [
        { symbol: "T", description: "Time delay or total period (seconds)" },
        { symbol: "R", description: "Timing resistor — monostable (Ω)" },
        { symbol: "R1", description: "Resistor between Vcc and Pin 7 — astable (Ω)" },
        { symbol: "R2", description: "Resistor between Pin 7 and Pins 6&2 — astable (Ω)" },
        { symbol: "C", description: "Timing capacitor (F)" },
        { symbol: "f", description: "Frequency (Hz)" },
        { symbol: "Duty Cycle", description: "(T_HIGH / T_total) × 100%" }
      ],
      monostable: {
        description: "In Monostable mode, the output gives one pulse when triggered. The pulse width (time delay) depends on R and C. Used for delay circuits, push-button timers, relay delay, and automatic switch-off.",
        formula: "T = 1.1 × R × C",
        circuit: [
          "R connected between Vcc and Discharge (Pin 7)",
          "C connected from Threshold (Pin 6) to Ground",
          "Trigger at Pin 2",
          "Output at Pin 3"
        ]
      },
      astable: {
        description: "In Astable mode, the output continuously switches between HIGH and LOW, generating a square wave. Used for LED blinkers, tone generators, clock signals, and PWM.",
        formulas: {
          high: "T_H = 0.693 × (R1 + R2) × C",
          low: "T_L = 0.693 × R2 × C",
          period: "T = T_H + T_L = 0.693 × (R1 + 2×R2) × C",
          frequency: "f = 1.44 / ((R1 + 2×R2) × C)",
          dutyCycle: "Duty Cycle = T_H / T × 100%"
        },
        circuit: [
          "R1 between Vcc and Pin 7 (Discharge)",
          "R2 between Pin 7 and Pins 6 & 2 (Threshold/Trigger)",
          "C from Pins 6 & 2 to Ground",
          "Output at Pin 3"
        ]
      },
      practicalNotes: [
        "Standard 555 minimum R ≈ 1kΩ",
        "For long delays, use large capacitors (electrolytic)",
        "Electrolytic capacitor leakage affects accuracy for long timings",
        "CMOS 555 (like TLC555) gives better precision and lower power",
        "Maximum output current ≈ 200mA (use transistor for relay loads)"
      ],
      workedExamples: {
        monostable: {
          given: "R = 100kΩ, C = 100µF (Monostable)",
          step1: { label: "Calculate Time Delay", formula: "T = 1.1 × 100,000 × 0.0001 = 11 seconds" },
          conclusion: "Output stays HIGH for 11 seconds after trigger."
        },
        astable: {
          given: "R1 = 10kΩ, R2 = 10kΩ, C = 100µF (Astable)",
          step1: { label: "Calculate HIGH & LOW times", formula: "T_H = 0.693 × (10k + 10k) × 100µF = 1.386s, T_L = 0.693 × 10k × 100µF = 0.693s" },
          step2: { label: "Calculate Period & Frequency", formula: "T = 1.386 + 0.693 = 2.079s, f = 1/2.079 ≈ 0.48 Hz" },
          conclusion: "LED blinks about once every 2 seconds with ~67% duty cycle."
        }
      }
    },
    features: ["Monostable delay calculator", "Astable oscillator calculator", "Frequency & duty cycle", "HIGH/LOW time breakdown", "Practical design notes"],
    specifications: { "Monostable": "T = 1.1 × R × C", "Astable Period": "T = 0.693 × (R1 + 2R2) × C", "Frequency": "f = 1.44 / ((R1 + 2R2) × C)", "Duty Cycle": "(R1+R2) / (R1+2R2) × 100%", "Output": "Time, frequency, duty cycle" },
    hasCalculator: true,
    calculatorType: "555-timer"
  }
];
