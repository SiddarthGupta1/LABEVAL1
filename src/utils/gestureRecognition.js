// Gesture recognition utilities (JS version)

export function countFingers(landmarks, handedness) {
  if (!landmarks || landmarks.length === 0) return 0;

  let count = 0;

  
  const thumbTip = landmarks[4];
  const indexBase = landmarks[5]; // base of index finger (MCP)
  
  const xs = landmarks.map(l => l.x);
  const handWidth = Math.max(...xs) - Math.min(...xs);
  const thumbDist = Math.hypot(thumbTip.x - indexBase.x, thumbTip.y - indexBase.y);
  // Tuned thresholds: use a configurable thumb ratio (kept at 0.30 per request)
  const THUMB_RATIO = 0.30; 
  const MIN_THUMB_DISTANCE = 0.015;
  const WRIST_X = landmarks[0].x;
  const WRIST_X_THRESHOLD = Math.max(0.02, handWidth * 0.15);

  
  if (
    thumbDist > Math.max(MIN_THUMB_DISTANCE, handWidth * THUMB_RATIO) ||
    (handedness === 'Left' && WRIST_X - thumbTip.x > WRIST_X_THRESHOLD) ||
    (handedness === 'Right' && thumbTip.x - WRIST_X > WRIST_X_THRESHOLD)
  ) {
    count++;
  }

 
  const fingerTips = [8, 12, 16, 20];
  const fingerPips = [6, 10, 14, 18];
  const FINGER_THRESHOLD = 0.02;

  for (let i = 0; i < fingerTips.length; i++) {
    const tip = landmarks[fingerTips[i]];
    const pip = landmarks[fingerPips[i]];
    if (tip.y < pip.y - FINGER_THRESHOLD) {
      count++;
    }
  }

  return count;
}

export function recognizeCountingGesture(hands) {
  if (!hands || hands.length === 0) return 0;

  let totalFingers = 0;

  for (const hand of hands) {
    if (hand.landmarks) {
      totalFingers += countFingers(hand.landmarks, hand.handedness);
    }
  }

  return totalFingers;
}

export function recognizeShapeGesture(hands) {
  if (!hands || hands.length === 0) return null;

  if (hands.length === 1) {
    const fingers = countFingers(hands[0].landmarks, hands[0].handedness);
    if (fingers === 4 || fingers === 5) {
      return 'square';
    }
  } else if (hands.length === 2) {
    const leftFingers = countFingers(hands[0].landmarks, hands[0].handedness);
    const rightFingers = countFingers(hands[1].landmarks, hands[1].handedness);
    if ((leftFingers === 4 || leftFingers === 5) && (rightFingers === 4 || rightFingers === 5)) {
      return 'rectangle';
    }
  }

  return null;
}

export function recognizeSocialGesture(hands) {
  if (!hands || hands.length === 0) return null;

  // Two-hands greeting (Namaskaar): check wrist proximity
  if (hands.length === 2 && hands[0].landmarks && hands[1].landmarks) {
    const w0 = hands[0].landmarks[0];
    const w1 = hands[1].landmarks[0];
    const dx = w0.x - w1.x;
    const dy = w0.y - w1.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.12) {
      return 'namaskaar';
    }
  }

  const hand = hands[0];
  if (!hand.landmarks) return null;

  const landmarks = hand.landmarks;
  const fingers = countFingers(landmarks, hand.handedness);


  if (fingers >= 4) {
    const wristY = landmarks[0].y;
    const middleFingerY = landmarks[12].y;

    if (middleFingerY < wristY - 0.15) {
      return 'hello';
    }
  }

  if (fingers === 1) {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];

    if (thumbTip.y < landmarks[0].y - 0.1 && indexTip.y > landmarks[6].y) {
      return 'thumbs-up';
    }

    if (thumbTip.y > landmarks[0].y + 0.1 && indexTip.y > landmarks[6].y) {
      return 'thumbs-down';
    }
  }


  if (fingers === 0 || fingers === 1) {
    return 'bye';
  }

  return null;
}
