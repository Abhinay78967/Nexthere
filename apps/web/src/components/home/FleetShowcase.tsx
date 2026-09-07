'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Truck, 
  Weight, 
  Ruler, 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

interface FleetVehicle {
  id: string;
  name: string;
  category: 'intra' | 'inter' | 'heavy';
  payload: string;
  dimensions: string;
  bestFor: string;
  features: string[];
  imageUrl: string;
  tag: string;
}

const FLEET_DATA: FleetVehicle[] = [
  {
    id: 'tata-ace',
    name: 'Tata Ace / 7ft Mini Truck',
    category: 'intra',
    payload: '750 kg Payload',
    dimensions: '7.2 ft × 4.8 ft × 4.9 ft',
    bestFor: 'Intra-city retail distribution, cartons, eCommerce, small hardware.',
    features: ['Agile narrow street access', 'Rapid same-day dispatch', 'GPS live telematics'],
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop',
    tag: 'Popular Intra-City',
  },
  {
    id: 'bolero-pickup',
    name: '8ft Bolero Pickup Truck',
    category: 'intra',
    payload: '1,250 kg (1.25 Ton)',
    dimensions: '8.2 ft × 5.2 ft × 5.0 ft',
    bestFor: 'Industrial machinery components, electrical panels, plywood, heavy crates.',
    features: ['Reinforced cargo bed', 'High ground clearance', 'Heavy load suspension'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
    tag: 'Heavy Hardware',
  },
  {
    id: 'canter-14ft',
    name: '14ft Canter / Intermediate Carrier',
    category: 'inter',
    payload: '3,500 kg (3.5 Ton)',
    dimensions: '14.0 ft × 6.5 ft × 6.5 ft',
    bestFor: 'Factory palletized loads, FMCG multi-hub delivery, institutional relocations.',
    features: ['Covered weatherproof container', 'Pallet-friendly floor', 'Long-haul inter-state ready'],
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800&auto=format&fit=crop',
    tag: 'FMCG & Supply Chain',
  },
  {
    id: 'multi-axle',
    name: '19ft - 32ft Heavy Multi-Axle FTL',
    category: 'heavy',
    payload: '7,000 kg - 18,000 kg (7 to 18 Ton)',
    dimensions: '19ft to 32ft High-Deck / Container',
    bestFor: 'Full Truck Load (FTL) bulk materials, raw steel, heavy coils, pan-India transit.',
    features: ['Dedicated corridor transit', 'Multi-driver express shifts', 'Comprehensive transit insurance'],
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop',
    tag: 'Long-Haul Freight',
  },
];

export function FleetShowcase() {
  const [filter, setFilter] = useState<'all' | 'intra' | 'inter' | 'heavy'>('all');

  const filteredFleet = filter === 'all' 
    ? FLEET_DATA 
    : FLEET_DATA.filter((v) => v.category === filter);

  return (
    <section className="w-full py-20 md:py-28 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest mb-3">
              <Truck className="w-3.5 h-3.5" /> NextHere Mobility & Fleet
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Commercial Fleet for Every Consignment
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base leading-relaxed">
              From fast city dispatches to heavy multi-ton freight corridors across Delhi NCR and national highways.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-surface-muted border border-border rounded-2xl w-fit">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Vehicles
            </button>
            <button
              onClick={() => setFilter('intra')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === 'intra'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Intra-City (Mini Trucks)
            </button>
            <button
              onClick={() => setFilter('inter')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === 'inter'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Canter & Medium
            </button>
            <button
              onClick={() => setFilter('heavy')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === 'heavy'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Heavy Multi-Axle
            </button>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-surface rounded-3xl border border-border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950">
                  <Image
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/90 text-white border border-white/20 backdrop-blur-md">
                      {vehicle.tag}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-extrabold text-base text-foreground group-hover:text-primary transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {vehicle.bestFor}
                    </p>
                  </div>

                  {/* Specs Box */}
                  <div className="p-3 rounded-xl bg-surface-muted border border-border space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                        <Weight className="w-3.5 h-3.5 text-primary" /> Capacity
                      </span>
                      <span className="font-bold text-foreground">{vehicle.payload}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                        <Ruler className="w-3.5 h-3.5 text-primary" /> Bed Size
                      </span>
                      <span className="font-semibold text-foreground text-[11px]">{vehicle.dimensions}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {vehicle.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link
                  href={`/request-quote?service=logistics&vehicle=${encodeURIComponent(vehicle.name)}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-semibold text-xs transition-colors"
                >
                  <span>Book / Request Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-surface-muted border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm">Need monthly recurring freight or customized contract logistics?</h4>
              <p className="text-xs text-muted-foreground mt-0.5">We provide dedicated driver & fleet arrangements with SLA billing.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all flex-shrink-0"
          >
            Consult Logistics Team →
          </Link>
        </div>
      </div>
    </section>
  );
}
