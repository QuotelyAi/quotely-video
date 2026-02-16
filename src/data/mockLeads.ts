export interface MockLead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicle: string;
  carrier: string;
  monthlyRate: number;
  status: 'New' | 'Processing' | 'Quoted' | 'Contacted' | 'Responded';
  emailOpened: boolean;
  clicked: boolean;
  responded: boolean;
  timestamp: string;
}

const firstNames = [
  'James', 'Maria', 'Robert', 'Linda', 'Michael', 'Sarah', 'David', 'Jennifer',
  'Richard', 'Patricia', 'Thomas', 'Elizabeth', 'Charles', 'Susan', 'Daniel',
  'Jessica', 'Matthew', 'Karen', 'Anthony', 'Nancy', 'Mark', 'Lisa', 'Steven',
  'Betty', 'Paul', 'Dorothy', 'Andrew', 'Sandra', 'Joshua', 'Ashley', 'Kenneth',
  'Donna', 'Kevin', 'Carol', 'Brian', 'Ruth', 'George', 'Sharon', 'Timothy',
  'Michelle', 'Ronald', 'Laura', 'Edward', 'Kimberly', 'Jason', 'Deborah',
  'Jeffrey', 'Stephanie', 'Ryan', 'Rebecca',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill',
  'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell',
  'Mitchell', 'Carter', 'Roberts',
];

const vehicles = [
  '2024 Toyota Camry', '2023 Honda Civic', '2024 Ford F-150', '2023 Chevrolet Equinox',
  '2024 Tesla Model 3', '2023 Hyundai Tucson', '2024 BMW 3 Series', '2023 Nissan Altima',
  '2024 Subaru Outback', '2023 Kia Sorento', '2024 Jeep Grand Cherokee', '2023 Mazda CX-5',
  '2024 Volkswagen Jetta', '2023 GMC Sierra', '2024 Audi A4', '2023 Toyota RAV4',
  '2024 Honda CR-V', '2023 Ford Explorer', '2024 Chevrolet Malibu', '2023 Hyundai Sonata',
  '2024 Dodge Ram 1500', '2023 Lexus RX', '2024 Mercedes C-Class', '2023 Acura TLX',
  '2024 Volvo XC60',
];

const carriers = [
  'Progressive', 'GEICO', 'State Farm', 'Allstate', 'Liberty Mutual',
  'Nationwide', 'Travelers', 'USAA', 'Farmers', 'American Family',
];

export const MOCK_LEADS: MockLead[] = Array.from({ length: 50 }, (_, i) => {
  const rate = 67 + Math.floor(Math.random() * 120);
  const isOpened = i < 12;
  const isClicked = i < 8;
  const isResponded = i < 3;

  return {
    id: i + 1,
    firstName: firstNames[i],
    lastName: lastNames[i],
    email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@email.com`,
    phone: `(${555 + Math.floor(i / 10)}) ${100 + i * 7}-${1000 + i * 13}`,
    vehicle: vehicles[i % vehicles.length],
    carrier: carriers[i % carriers.length],
    monthlyRate: rate,
    status: 'Quoted' as const,
    emailOpened: isOpened,
    clicked: isClicked,
    responded: isResponded,
    timestamp: `2:${String(Math.floor(i * 2.4)).padStart(2, '0')} PM`,
  };
});
