export const url = "http://localhost:8080";
export const keyspaces = [
  "system_auth",
  "system_schema",
  "system_distributed",
  "system",
  "development",
  "system_traces",
];

export const tableList = [
  {
    keyspace_name: "development",
    table_name: "spacecraft_journey_catalog",
    bloom_filter_fp_chance: 0.01,
    caching: { keys: "ALL", rows_per_partition: "NONE" },
    cdc: null,
    comment: "",
    compaction: {
      class: "org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy",
      max_threshold: "32",
      min_threshold: "4",
    },
    compression: {
      chunk_length_in_kb: "64",
      class: "org.apache.cassandra.io.compress.LZ4Compressor",
    },
    crc_check_chance: 1,
    dclocal_read_repair_chance: 0.1,
    default_time_to_live: 0,
    extensions: {},
    flags: ["compound"],
    gc_grace_seconds: 864000,

    max_index_interval: 2048,
    memtable_flush_period_in_ms: 0,
    min_index_interval: 128,
    read_repair_chance: 0,
    speculative_retry: "99PERCENTILE",
  },
  {
    keyspace_name: "development",
    table_name: "spacecraft_location_over_time",
    bloom_filter_fp_chance: 0.01,
    caching: { keys: "ALL", rows_per_partition: "NONE" },
    cdc: null,
    comment: "",
    compaction: {
      class: "org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy",
      max_threshold: "32",
      min_threshold: "4",
    },
    compression: {
      chunk_length_in_kb: "64",
      class: "org.apache.cassandra.io.compress.LZ4Compressor",
    },
    crc_check_chance: 1,
    dclocal_read_repair_chance: 0.1,
    default_time_to_live: 0,
    extensions: {},
    flags: ["compound"],
    gc_grace_seconds: 864000,

    max_index_interval: 2048,
    memtable_flush_period_in_ms: 0,
    min_index_interval: 128,
    read_repair_chance: 0,
    speculative_retry: "99PERCENTILE",
  },
  {
    keyspace_name: "development",
    table_name: "spacecraft_pressure_over_time",
    bloom_filter_fp_chance: 0.01,
    caching: { keys: "ALL", rows_per_partition: "NONE" },
    cdc: null,
    comment: "",
    compaction: {
      class: "org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy",
      max_threshold: "32",
      min_threshold: "4",
    },
    compression: {
      chunk_length_in_kb: "64",
      class: "org.apache.cassandra.io.compress.LZ4Compressor",
    },
    crc_check_chance: 1,
    dclocal_read_repair_chance: 0.1,
    default_time_to_live: 0,
    extensions: {},
    flags: ["compound"],
    gc_grace_seconds: 864000,

    max_index_interval: 2048,
    memtable_flush_period_in_ms: 0,
    min_index_interval: 128,
    read_repair_chance: 0,
    speculative_retry: "99PERCENTILE",
  },
  {
    keyspace_name: "development",
    table_name: "spacecraft_speed_over_time",
    bloom_filter_fp_chance: 0.01,
    caching: { keys: "ALL", rows_per_partition: "NONE" },
    cdc: null,
    comment: "",
    compaction: {
      class: "org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy",
      max_threshold: "32",
      min_threshold: "4",
    },
    compression: {
      chunk_length_in_kb: "64",
      class: "org.apache.cassandra.io.compress.LZ4Compressor",
    },
    crc_check_chance: 1,
    dclocal_read_repair_chance: 0.1,
    default_time_to_live: 0,
    extensions: {},
    flags: ["compound"],
    gc_grace_seconds: 864000,

    max_index_interval: 2048,
    memtable_flush_period_in_ms: 0,
    min_index_interval: 128,
    read_repair_chance: 0,
    speculative_retry: "99PERCENTILE",
  },
  {
    keyspace_name: "development",
    table_name: "spacecraft_temperature_over_time",
    bloom_filter_fp_chance: 0.01,
    caching: { keys: "ALL", rows_per_partition: "NONE" },
    cdc: null,
    comment: "",
    compaction: {
      class: "org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy",
      max_threshold: "32",
      min_threshold: "4",
    },
    compression: {
      chunk_length_in_kb: "64",
      class: "org.apache.cassandra.io.compress.LZ4Compressor",
    },
    crc_check_chance: 1,
    dclocal_read_repair_chance: 0.1,
    default_time_to_live: 0,
    extensions: {},
    flags: ["compound"],
    gc_grace_seconds: 864000,

    max_index_interval: 2048,
    memtable_flush_period_in_ms: 0,
    min_index_interval: 128,
    read_repair_chance: 0,
    speculative_retry: "99PERCENTILE",
  },
];

export let connections = [
  {
    connectionName: "INT",
    host: "10.10.12.10",
    port: "9462",
  },
  {
    connectionName: "Local",
    host: "10.10.150.10",
    port: "9462",
  },
  {
    connectionName: "QA",
    host: "10.10.162.10",
    port: "9652",
  },
  {
    connectionName: "PROD",
    host: "localhost",
    port: "9462",
    isWriteProtected: true,
  },
];

export const tableInfo = {
  localReadRepairChance: 0.1,
  readRepairChance: 0,
  extensions: {},
  crcCheckChance: 1,
  populateCacheOnFlush: false,
  defaultTtl: 0,
  speculativeRetry: "99PERCENTILE",
  minIndexInterval: 128,
  maxIndexInterval: 2048,
  columns: [
    { name: "active", type: [Object], isStatic: false },
    { name: "end", type: [Object], isStatic: false },
    { name: "journey_id", type: [Object], isStatic: false },
    { name: "spacecraft_name", type: [Object], isStatic: false },
    { name: "start", type: [Object], isStatic: false },
    { name: "summary", type: [Object], isStatic: false },
  ],
  columnsByName: {
    active: { name: "active", type: [Object], isStatic: false },
    end: { name: "end", type: [Object], isStatic: false },
    journey_id: { name: "journey_id", type: [Object], isStatic: false },
    spacecraft_name: {
      name: "spacecraft_name",
      type: [Object],
      isStatic: false,
    },
    start: { name: "start", type: [Object], isStatic: false },
    summary: { name: "summary", type: [Object], isStatic: false },
  },
  partitionKeys: [{ name: "spacecraft_name", type: [Object], isStatic: false }],
  clusteringKeys: [{ name: "journey_id", type: [Object], isStatic: false }],
  clusteringOrder: ["DESC"],
  nodesync: null,
  replicateOnWrite: true,
  memtableFlushPeriod: 0,
  indexInterval: null,
  isCompact: false,
  indexes: [],
  cdc: null,
  virtual: false,
};
