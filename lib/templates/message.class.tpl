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

    unpack(param1, param2) {
        this.deserialize(param1);
    }

    pack(param) {
        var loc2 = new ByteArray();
        this.serialize(new CustomDataWrapper(loc2));
        NetworkMessage.writePacket(param, this.getMessageId(), loc2);
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