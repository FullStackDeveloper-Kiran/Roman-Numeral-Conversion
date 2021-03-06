/**************/
/* CONVERSION */
/**************/
//console.log(numberToRomanNumeral(2678));
//console.log(romanNumeralToNumber("MMDCLXXVIII"));
function numberToRomanNumeral(number) {
  let m;
  return [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1]].
  reduce(function (num, curr) {
    let [r, n] = curr;
    while (number >= n) {
      if (m != null && m > n) return false;
      m = n;
      number -= n;
      num += r;
    }
    return num;
  }, ``);
}
function romanNumeralToNumber(romanNumerals) {
  var value = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  return romanNumerals.
  split("").
  map(d => value[d]).
  reduce((s, v, i, o) => s + (o[i + 1] > v ? -v : v), 0);
}

/***************/
/* REACT STUFF */
/***************/
class RomanNumerals extends React.Component {
  constructor(props) {
    super(props);

    this.state = { input: `MMDCLXXVIII`, numerals: `MMDCLXXVIII`, value: 2678 };
    this.updateInput = this.updateInput.bind(this);
  }
  updateInput(input) {
    let n, v;
    switch (typeof input) {
      case `number`:
        v = numberToRomanNumeral(input);
        n = v;
        break;
      case `string`:
        n = input;
        v = romanNumeralToNumber(input);
        break;}

    this.setState({
      input: input,
      numerals: n,
      value: v });

  }
  render() {
    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement(Input, { value: this.state.input, onChange: this.updateInput }), /*#__PURE__*/
      React.createElement(Numerals, { numerals: this.state.numerals }), /*#__PURE__*/
      React.createElement(Result, { value: this.state.value })));


  }}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    let value = e.target.value.replace(/ /g, ``).toUpperCase();
    if (!isNaN(value) && value.length > 0) value = parseInt(value.substr(0, 4));
    this.props.onChange(value);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "input" }, /*#__PURE__*/
      React.createElement("input", {
        type: "text",
        className: parseInt(this.props.value).toString() != this.props.value ? "serif" : "",
        value: this.props.value,
        onChange: this.handleChange })));



  }}

class Numerals extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "romannumerals", class: "serif" },
      [
      ...this.props.numerals.match(
      /(M*(CM)?)([DC]*(XC)?)([LX]*(IX)?)([VI]*)/)].


      splice(1).
      filter((x, i) => i % 2 == 0).
      map(x => /*#__PURE__*/React.createElement("div", { "data-title": romanNumeralToNumber(x) }, x))));


  }}

class Result extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", { id: "result" }, this.props.value);
  }}

ReactDOM.render( /*#__PURE__*/React.createElement(RomanNumerals, null), document.getElementById(`app`));