export default {
  name: 'notification',
  props: {
    message: String,
    title: String,
    icon: String,
    verticalAlign: {
      type: String,
      default: 'top',
      validator: (value) => {
        const acceptedValues = ['top', 'bottom'];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    horizontalAlign: {
      type: String,
      default: 'right',
      validator: (value) => {
        const acceptedValues = ['left', 'center', 'right'];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => {
        const acceptedValues = ['info', 'primary', 'danger', 'warning', 'success'];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    timeout: {
      type: Number,
      default: 5000,
      validator: value => value >= 0,
    },
    timestamp: {
      type: Date,
      default: () => new Date(),
    },
    component: {
      type: [Object, Function],
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    clickHandler: Function,
  },
  data() {
    return {
      elmHeight: 0,
    };
  },
  computed: {
    hasIcon() {
      return this.icon && this.icon.length > 0;
    },
    alertType() {
      return `alert-${this.type}`;
    },
    customPosition() {
      const initialMargin = 20;
      const alertHeight = this.elmHeight + 10;
      let sameAlertsCount = this.$notifications.state.filter((alert) => { // eslint-disable-line arrow-body-style
        return alert.horizontalAlign === this.horizontalAlign && alert.verticalAlign === this.verticalAlign && alert.timestamp <= this.timestamp;
      }).length;
      if (this.$notifications.settings.overlap) sameAlertsCount = 1;

      const pixels = (sameAlertsCount - 1) * alertHeight + initialMargin;
      const styles = {};
      if (this.verticalAlign === 'top') styles.top = `${pixels}px`;
      else styles.bottom = `${pixels}px`;

      return styles;
    },
  },
  methods: {
    close() {
      this.$emit('close', this.timestamp);
    },
    tryClose(evt) {
      if (this.clickHandler) this.clickHandler(evt, this);
      if (this.closeOnClick) this.close();
    },
  },
  mounted() {
    this.elmHeight = this.$el.clientHeight;
    if (this.timeout) setTimeout(this.close, this.timeout);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  render() {
    return (
      <div onClick={this.tryClose}
        data-notify="container"
        class={['alert open ', { 'alert-with-icon': this.icon }, this.verticalAlign, this.horizontalAlign, this.alertType]}
        role="alert"
        style={this.customPosition}
        data-notify-position="top-center">
        {this.showClose &&
          <button
            type="button"
            aria-hidden="true"
            class="close col-xs-1"
            data-notify="dismiss"
            onClick={this.close}>×
          </button>
        }
        {this.icon &&
          <span data-notify="icon" class={['alert-icon', this.icon]}></span>
        }
        <span data-notify="message">
        {this.title !== undefined && <span class="title"><b>{this.title}<br/></b></span>}
        {this.message !== undefined && this.message}
        {this.component !== undefined && <this.component></this.component>}
        </span>
      </div>
    );
  },
};
