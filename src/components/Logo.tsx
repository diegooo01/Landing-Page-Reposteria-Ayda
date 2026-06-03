import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  size?: number; // width in pixels
  animated?: boolean;
}

export default function Logo({ className = '', size = 200, animated = true }: LogoProps) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const chefHatVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.3, duration: 0.6, type: 'spring', stiffness: 100 }
    }
  };

  const aspect = 405 / 450; // original aspect ratio approx
  const height = size / aspect;

  const content = (
    <svg
      width={size}
      height={height}
      viewBox="0 0 450 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none dropdown-shadow"
    >
      {/* Outer Romantic Pink Glow / Subtle Shadow for layering */}
      <circle cx="225" cy="275" r="190" fill="#D25D7E" fillOpacity="0.05" />

      {/* Scalloped outer circle structure (White layout, Pink border) */}
      <path
        d="M225,85 
           C245,85 260,95 275,100 C290,105 310,103 325,115 C340,127 344,147 355,163 C366,179 385,190 391,208 C397,226 389,246 391,265 C393,284 403,303 399,322 C395,341 379,355 371,372 C363,389 361,410 348,424 C335,438 315,441 299,451 C283,461 268,477 250,481 C232,485 212,477 195,475 C178,473 161,477 145,471 C129,465 116,449 102,439 C88,429 69,425 58,411 C47,397 45,377 38,360 C31,343 19,328 17,309 C15,290 23,271 23,252 C23,233 13,214 17,195 C21,176 37,162 45,145 C53,128 55,107 68,93 C81,79 101,76 117,66 C133,56 148,40 166,36 C184,32 204,40 221,42 Z"
        fill="#FFFFFF"
        stroke="#D25D7E"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Decorative inner scalloped pink guide frame */}
      <path
        d="M225,105 
           C241,105 253,113 265,117 C277,121 293,119 305,129 C317,139 320,155 329,168 C338,181 353,190 358,204 C363,218 357,234 358,249 C359,264 367,279 364,294 C361,309 348,320 342,334 C336,348 334,365 324,376 C314,387 298,389 285,397 C272,405 260,418 246,421 C232,424 216,418 202,416 C188,414 175,417 162,412 C149,407 139,394 128,386 C117,378 102,375 93,364 C84,353 82,337 77,323 C72,309 62,297 61,282 C60,267 66,252 66,236 C66,220 58,205 61,190 C64,175 77,164 83,150 C89,136 91,119 101,108 C111,97 127,95 140,87 C153,79 165,66 179,63 C193,60 209,66 222,68 Z"
        stroke="#FCE7EC"
        strokeWidth="2.5"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* Inner circular luxury border */}
      <circle cx="225" cy="275" r="150" stroke="#D25D7E" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

      {/* Chef Hat at top (Absolute Center, overlaps the frame beautifully in light pink style) */}
      <g id="chef-hat">
        {/* Shadow/Backing for Hat */}
        <path
          d="M175,100 C155,100 150,70 170,55 C165,25 210,15 225,40 C240,15 285,25 280,55 C300,70 295,100 275,100 Z"
          fill="#FFF0F3"
        />
        {/* Base of Chef Hat - Elegant Blush */}
        <path
          d="M185,100 L265,100 C270,100 271,115 271,125 C271,135 270,150 263,150 L187,150 C180,150 179,135 179,125 C179,115 180,100 185,100 Z"
          fill="#FFF0F3"
          stroke="#D25D7E"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        
        {/* Hat folds detail */}
        <path
          d="M190,140 L260,140"
          stroke="#D25D7E"
          strokeWidth="3"
        />

        {/* Top fluffy puff of Hat */}
        <path
          d="M180,100 
             C150,100 145,55 180,50 
             C175,15 225,10 225,35 
             C225,10 275,15 270,50 
             C305,55 300,100 270,100"
          fill="#FFFFFF"
          stroke="#D25D7E"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Chef hat inner accent lines */}
        <path d="M195,85 C185,75 190,60 195,55" stroke="#D25D7E" strokeWidth="3" strokeLinecap="round" />
        <path d="M225,85 C220,65 225,50 223,40" stroke="#D25D7E" strokeWidth="3" strokeLinecap="round" />
        <path d="M255,85 C265,75 260,60 255,55" stroke="#D25D7E" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Main text: "Ayda" in gorgeous cursive script */}
      <g id="text-ayda">
        <text
          x="225"
          y="235"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="72"
          fontWeight="bold"
          fill="#1c1917"
          textAnchor="middle"
          letterSpacing="1"
        >
          Ayda
        </text>
        {/* Symmetrical flourish curves on sides of "Ayda" */}
        {/* Left side flourish */}
        <path
          d="M105,215 C115,225 125,225 135,220 C145,215 140,205 130,205 C120,205 115,215 125,225"
          stroke="#D25D7E"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Right side flourish */}
        <path
          d="M345,215 C335,225 325,225 315,220 C305,215 310,205 320,205 C330,205 335,215 325,225"
          stroke="#D25D7E"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Horizontal Curved Pink Banner: "PEDACITO DE CIELO" */}
      <g id="ribbon">
        {/* Left Hanging ribbon tail */}
        <path
          d="M15,270 L50,230 L55,290 Z"
          fill="#4A1521"
          stroke="#D25D7E"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M15,270 L52,277 C65,280 80,265 85,255 L50,230 Z"
          fill="#D25D7E"
          stroke="#D25D7E"
          strokeWidth="4"
        />
        
        {/* Right Hanging ribbon tail */}
        <path
          d="M435,270 L400,230 L395,290 Z"
          fill="#4A1521"
          stroke="#D25D7E"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M435,270 L398,277 C385,280 370,265 365,255 L400,230 Z"
          fill="#D25D7E"
          stroke="#D25D7E"
          strokeWidth="4"
        />

        {/* Central Ribbon body with white bold capital text "PEDACITO DE CIELO" */}
        <path
          d="M40,290 C120,330 330,330 410,290 L400,240 C320,280 130,280 50,240 Z"
          fill="#D25D7E"
          stroke="#D25D7E"
          strokeWidth="5.5"
          strokeLinejoin="round"
        />

        {/* Invisible SVG path for text overlay to route the curved text */}
        <path
          id="ribbon-text-path"
          d="M45,278 C125,316 325,316 405,278"
          fill="none"
          stroke="none"
        />
        
        {/* Direct Text fall-back centered perfectly */}
        <text
          x="225"
          y="284"
          fontFamily="'Inter', sans-serif"
          fontSize="19"
          fontWeight="700"
          fill="#ffffff"
          textAnchor="middle"
          letterSpacing="4"
          className="tracking-widest"
        >
          PEDACITO DE CIELO
        </text>
      </g>

      {/* Subtitle below ribbon: "Chocotejas & Postres" */}
      <g id="subtitle">
        <text
          x="225"
          y="350"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="22"
          fontWeight="505"
          fontStyle="italic"
          fill="#D25D7E"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          Chocotejas & Postres
        </text>

        {/* Fine ornamental flourish decoration at bottom */}
        <g transform="translate(185, 375)">
          {/* Scrollwork path */}
          <path
            d="M 10 10 C 25 15, 30 5, 40 10 C 30 15, 25 5, 10 10 Z"
            fill="#D25D7E"
          />
          <path
            d="M 70 10 C 55 15, 50 5, 40 10 C 50 15, 55 5, 70 10 Z"
            fill="#D25D7E"
          />
          {/* Central floral diamond */}
          <polygon points="40,2 45,10 40,18 35,10" fill="#D25D7E" />
          <circle cx="28" cy="10" r="3" fill="#D25D7E" />
          <circle cx="52" cy="10" r="3" fill="#D25D7E" />
        </g>
      </g>
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`inline-block ${className}`}
        style={{ width: size }}
        id="ayda-logo-container"
      >
        <motion.div variants={chefHatVariants}>{content}</motion.div>
      </motion.div>
    );
  }

  return (
    <div className={`inline-block ${className}`} style={{ width: size, height }} id="ayda-logo-container">
      {content}
    </div>
  );
}
