import React, { Component } from 'react';

const MILLI_TO_SECONDS = 1e-3;
const MINUTE_TO_SECONDS = 60;
const HOURS_TO_SECONDS = 60 * MINUTE_TO_SECONDS;
const DAYS_TO_SECONDS = 24 * HOURS_TO_SECONDS;
const WEEKS_TO_SECONDS = 7 * DAYS_TO_SECONDS;
const TWOWEEKS_TO_SECONDS = 2 * WEEKS_TO_SECONDS;

function getDates(history) {
  return history.map(dText => new Date(dText));
}


function getDeltas(dates) {
  const deltas = [];
  for (let i = 1; i < dates.length; i++) {
    deltas.push((dates[i] - dates[i - 1]) * MILLI_TO_SECONDS);
  }
  return deltas;
}

function countGroup(group) {
    const groupArr = [];
    group.forEach(weeks => {
      if (groupArr[weeks] == null) {
        groupArr[weeks] = 1;
      } else {
        groupArr[weeks] = groupArr[weeks] + 1;
      }
    });
    return groupArr;
}

function getHist(deltas) {
  const hist = new Map();
  const maxDelta = Math.max(...deltas);
  let counted = 0;
  if (maxDelta >= 2 * WEEKS_TO_SECONDS) {
    const group = deltas
      .filter(v => v >= WEEKS_TO_SECONDS)
      .map(v => Math.round(v / WEEKS_TO_SECONDS));
    const groupArr = countGroup(group);
    counted = group.length;
    hist.set('weeks', { hist: groupArr, count: group.length });
  }
  if (maxDelta  >= DAYS_TO_SECONDS && counted < deltas.length) {
    const group = deltas
      .filter(v => v >= DAYS_TO_SECONDS && (counted ? v < WEEKS_TO_SECONDS : true))
      .map(v => Math.round(v / DAYS_TO_SECONDS));
    const groupArr = countGroup(group);
    counted += group.length;
    hist.set('days', { hist: groupArr, count: group.length });
  }
  if (maxDelta  >= HOURS_TO_SECONDS && counted < deltas.length) {
    const group = deltas
      .filter(v => v >= HOURS_TO_SECONDS && (counted ? v < DAYS_TO_SECONDS : true))
      .map(v => Math.round(v / HOURS_TO_SECONDS));
    const groupArr = countGroup(group);
    counted += group.length;
    hist.set('hours', { hist: groupArr, count: group.length });
  }
  if (maxDelta  >= MINUTE_TO_SECONDS && counted < deltas.length) {
    const group = deltas
      .filter(v => v >= MINUTE_TO_SECONDS && (counted ? v < HOURS_TO_SECONDS : true))
      .map(v => Math.round(v / MINUTE_TO_SECONDS));
    const groupArr = countGroup(group);
    counted += group.length;
    hist.set('minutes', { hist: groupArr, count: group.length });
  }
  if (counted < deltas.length) {
    const group = deltas
      .filter(v => v >= 1 && (counted ? v < MINUTE_TO_SECONDS: true))
      .map(v => Math.round(v));
    const groupArr = countGroup(group);
    counted += group.length;
    groupArr[0] = deltas.length - counted;
    hist.set('seconds', { hist: groupArr, count: group.length });
  }
  const ret = {};
  ["weeks", "days", "hours", "minuts", "seconds"].forEach(
    groupKey => {
      if (hist.has(groupKey) && !ret.unit) {
        ret.unit = groupKey;
        const {hist: groupHist, count} = hist.get(groupKey);
        groupHist[0] = deltas.length - count;
        ret.hist = groupHist;
      }
    }
  )
  return ret;
}

export default class TimerHistogram extends Component {
  render() {
    const { history } = this.props;
    if ((history == null) || (history.length < 2)) {
      return (
        <div>To little data to say anything.</div>
      );
    }
    const dates = getDates(history);
    const deltas = getDeltas(dates);
    const { hist, unit } = getHist(deltas);
    const Hist = hist.map((v, i) => <div key={i}>{i} {unit}: {v}</div>);
    return (
      <div>
        <h2>Time between events</h2>
        {Hist}
      </div>
    )
  }
}
