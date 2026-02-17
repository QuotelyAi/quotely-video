import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn } from '../utils/animations';
import { BrowserChrome } from '../components/demo/BrowserChrome';
import { DashboardLayout } from '../components/demo/DashboardLayout';
import { DataTable } from '../components/demo/DataTable';
import { AnimatedCursor } from '../components/demo/AnimatedCursor';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { DEMO_SUBTITLES } from '../utils/demoSubtitles';
import { MOCK_LEADS } from '../data/mockLeads';
import type { SceneProps } from '../types';

const COLUMNS = [
  { key: 'id', label: '#', width: 50 },
  { key: 'name', label: 'Name', width: 180 },
  { key: 'vehicle', label: 'Vehicle' },
  { key: 'carrier', label: 'Carrier', width: 130 },
  { key: 'rate', label: 'Rate', width: 100 },
  { key: 'status', label: 'Status', width: 100 },
  { key: 'time', label: 'Quoted At', width: 100 },
];

const tableRows = MOCK_LEADS.map((lead) => ({
  id: lead.id,
  name: `${lead.firstName} ${lead.lastName}`,
  vehicle: lead.vehicle,
  carrier: lead.carrier,
  rate: `$${lead.monthlyRate}/mo`,
  status: 'Quoted',
  time: lead.timestamp,
}));

export const Demo03_CRMView: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.background }}>
      <div style={{ padding: 40, width: '100%', height: '100%' }}>
        <BrowserChrome url="app.quotely.info/leads">
          <DashboardLayout activeNav="Leads" headerTitle="CRM — All Leads">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Header area */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                  opacity: fadeIn(frame, 5, 15),
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <h2
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 22,
                      fontWeight: 700,
                      color: BRAND.colors.text,
                      margin: 0,
                    }}
                  >
                    All Leads
                  </h2>
                  <div
                    style={{
                      backgroundColor: 'rgba(34, 197, 94, 0.15)',
                      color: BRAND.colors.success,
                      padding: '4px 12px',
                      borderRadius: 20,
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    50 Quoted
                  </div>
                </div>
                {/* Search bar */}
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid #1e1e3a',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontFamily: BRAND.fonts.primary,
                    fontSize: 13,
                    color: '#555',
                    width: 240,
                  }}
                >
                  🔍 Search leads...
                </div>
              </div>

              {/* Data table */}
              <DataTable
                columns={COLUMNS}
                rows={tableRows}
                delay={20}
                scrollStartFrame={250}
                scrollEndFrame={600}
                visibleRows={11}
              />

              {/* Cursor simulates scrolling */}
              <AnimatedCursor
                waypoints={[
                  { x: 600, y: 200, frame: 0 },
                  { x: 600, y: 400, frame: 200 },
                  { x: 600, y: 350, frame: 250 },
                  { x: 600, y: 450, frame: 600 },
                  { x: 600, y: 400, frame: 700 },
                ]}
              />
            </div>
          </DashboardLayout>
        </BrowserChrome>
      </div>

      <SubtitleOverlay subtitles={DEMO_SUBTITLES.demo03} />
    </AbsoluteFill>
  );
};
