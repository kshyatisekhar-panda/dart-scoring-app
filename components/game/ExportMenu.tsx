'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { GameState } from '@/types/game';
import type { Player } from '@/types/player';

interface ExportMenuProps {
  currentGame: GameState;
  getPlayer: (playerId: string) => Player | undefined;
}

export default function ExportMenu({ currentGame, getPlayer }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const generateScoreboardHTML = () => {
    const sortedPlayers = [...currentGame.players]
      .map((playerId, index) => ({
        playerId,
        player: getPlayer(playerId),
        score: currentGame.scores[playerId],
        index
      }))
      .sort((a, b) => a.score.currentScore - b.score.currentScore);

    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: white; color: black;">
        ${currentGame.settings.gameName ? `
          <h1 style="text-align: center; color: #1f2937; margin-bottom: 5px; font-size: 32px; font-weight: bold;">
            ${currentGame.settings.gameName}
          </h1>
          <p style="text-align: center; color: #6b7280; margin-bottom: 20px; font-size: 16px;">
            ${currentGame.gameType.toUpperCase()} Game
          </p>
        ` : `
          <h1 style="text-align: center; color: #1f2937; margin-bottom: 5px; font-size: 32px; font-weight: bold;">
            ${currentGame.gameType.toUpperCase()} Game
          </h1>
        `}
        <p style="text-align: center; color: #6b7280; margin-bottom: 30px;">
          Game ID: ${currentGame.id} | Started: ${new Date(currentGame.startedAt).toLocaleString()}
          ${currentGame.finishedAt ? ` | Finished: ${new Date(currentGame.finishedAt).toLocaleString()}` : ''}
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <thead>
            <tr style="background: #1f2937; color: white;">
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Rank</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Player</th>
              <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Score</th>
              <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Average</th>
              <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Darts</th>
              <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Total</th>
              <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Rounds</th>
            </tr>
          </thead>
          <tbody>
            ${sortedPlayers.map((p, idx) => `
              <tr style="background: ${idx % 2 === 0 ? '#f9fafb' : 'white'};">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">${idx + 1}</td>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">${p.player?.name || 'Unknown'}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center; font-size: 18px; font-weight: bold; color: ${p.score.currentScore === 0 ? '#16a34a' : '#1f2937'};">
                  ${p.score.currentScore}
                </td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${p.score.average.toFixed(1)}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${p.score.dartsThrown}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${p.score.totalScore}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${p.score.rounds.length}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2 style="color: #1f2937; margin-bottom: 15px;">Round Details</h2>
        ${sortedPlayers.map(p => `
          <div style="margin-bottom: 25px; page-break-inside: avoid;">
            <h3 style="color: #374151; margin-bottom: 10px;">${p.player?.name || 'Unknown'}</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead>
                <tr style="background: #e5e7eb;">
                  <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Round</th>
                  <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Darts</th>
                  <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Score</th>
                  <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Remaining</th>
                </tr>
              </thead>
              <tbody>
                ${p.score.rounds.map(round => `
                  <tr>
                    <td style="padding: 6px; border: 1px solid #ddd;">R${round.roundNumber}</td>
                    <td style="padding: 6px; border: 1px solid #ddd;">
                      ${round.visits.flatMap(v => v.darts).map(dart => {
                        const prefix = dart.multiplier === 'double' ? 'D' : dart.multiplier === 'triple' ? 'T' : '';
                        const num = dart.number === 25 && dart.multiplier === 'double' ? 'Bull' : dart.number;
                        return `${prefix}${num}`;
                      }).join(', ')}
                    </td>
                    <td style="padding: 6px; border: 1px solid #ddd; text-align: center; font-weight: bold;">${round.totalThrown}</td>
                    <td style="padding: 6px; border: 1px solid #ddd; text-align: center;">${round.endScore}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `).join('')}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
          Generated by Dart Scoring App | ${new Date().toLocaleString()}<br/>
          <span style="margin-top: 5px; display: inline-block;">© ${new Date().getFullYear()} Kshyatisekhar Panda</span>
        </div>
      </div>
    `;
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    try {
      // Create a temporary container
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generateScoreboardHTML();
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      document.body.appendChild(tempDiv);

      // Generate canvas from HTML
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      });

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297; // A4 height

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      // Download PDF
      const gameName = currentGame.settings.gameName || currentGame.gameType;
      const filename = `${gameName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);

      // Cleanup
      document.body.removeChild(tempDiv);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const exportAsImage = async () => {
    setIsExporting(true);
    try {
      // Create a temporary container
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generateScoreboardHTML();
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '1200px';
      document.body.appendChild(tempDiv);

      // Generate canvas from HTML
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          const gameName = currentGame.settings.gameName || currentGame.gameType;
          link.download = `${gameName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
        document.body.removeChild(tempDiv);
      });
    } catch (error) {
      console.error('Error exporting image:', error);
      alert('Failed to export image. Please try again.');
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const exportAsJSON = () => {
    try {
      const exportData = {
        game: currentGame,
        players: currentGame.players.map(pid => getPlayer(pid)),
        exportedAt: new Date().toISOString()
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      const gameName = currentGame.settings.gameName || currentGame.gameType;
      link.download = `${gameName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setIsOpen(false);
    } catch (error) {
      console.error('Error exporting JSON:', error);
      alert('Failed to export JSON. Please try again.');
    }
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
        disabled={isExporting}
      >
        {isExporting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Exporting...
          </>
        ) : (
          <>
            📥 Export
          </>
        )}
      </button>

      {isOpen && !isExporting && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
            <button
              onClick={exportAsImage}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 rounded-t-lg flex items-center gap-2"
            >
              <span>🖼️</span>
              <span>Export as Image</span>
            </button>
            <button
              onClick={exportAsPDF}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 flex items-center gap-2"
            >
              <span>📄</span>
              <span>Export as PDF</span>
            </button>
            <button
              onClick={exportAsJSON}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 rounded-b-lg flex items-center gap-2"
            >
              <span>💾</span>
              <span>Export as JSON</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
