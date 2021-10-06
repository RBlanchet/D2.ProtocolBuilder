class <classname> extends <parent> {
    constructor(<super>) {
        <call>
        <vars>
        this.ID = <id>;
    }

    getMessageId() {
        return this.ID;
    }

    reset() {
        <vars>
    }

    serialize(output) {
        this.serializeAs_<classname>(output);
    }

    deserialize(input) {
        this.deserializeAs_<classname>(input);
    }

    serializeAs_<classname>(ouput) {
        <serialize>
    }

    deserializeAs_<classname>(input) {
        <deserialize>
    }
}