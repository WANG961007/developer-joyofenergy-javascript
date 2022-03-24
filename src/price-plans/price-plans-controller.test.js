const { meters } = require("../meters/meters");
const { pricePlanNames } = require("./price-plans");
const { readings } = require("../readings/readings");
const { compare, recommend, getLastWeekUsageCost} = require("./price-plans-controller");

describe("price plans", () => {
    it("should compare usage cost for all price plans", () => {
        const { getReadings } = readings({
            [meters.METER0]: [
                { time: 1607686125, reading: 0.26785 },
                { time: 1607599724, reading: 0.26785 },
                { time: 1607513324, reading: 0.26785 },
            ],
        });

        const expected = {
            pricePlanComparisons: [
                {
                    [pricePlanNames.PRICEPLAN0]: 0.26785 / 48 * 10,
                },
                {
                    [pricePlanNames.PRICEPLAN1]: 0.26785 / 48 * 2,
                },
                {
                    [pricePlanNames.PRICEPLAN2]: 0.26785 / 48 * 1,
                },
            ],
            smartMeterId: meters.METER0
        };

        const recommendation = compare(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
            query: {}
        });

        expect(recommendation).toEqual(expected);
    });

    it("should recommend usage cost for all price plans by ordering from cheapest to expensive", () => {
        const { getReadings } = readings({
            [meters.METER0]: [
                { time: 1607686125, reading: 0.26785 },
                { time: 1607599724, reading: 0.26785 },
                { time: 1607513324, reading: 0.26785 },
            ],
        });

        const expected = [
            {
                [pricePlanNames.PRICEPLAN2]: 0.26785 / 48 * 1,
            },
            {
                [pricePlanNames.PRICEPLAN1]: 0.26785 / 48 * 2,
            },
            {
                [pricePlanNames.PRICEPLAN0]: 0.26785 / 48 * 10,
            },
        ];

        const recommendation = recommend(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
            query: {}
        });

        expect(recommendation).toEqual(expected);
    });

    it("should limit recommendation", () => {
        const { getReadings } = readings({
            [meters.METER0]: [
                { time: 1607686125, reading: 0.26785 },
                { time: 1607599724, reading: 0.26785 },
                { time: 1607513324, reading: 0.26785 },
            ],
        });

        const expected = [
            {
                [pricePlanNames.PRICEPLAN2]: 0.26785 / 48 * 1,
            },
            {
                [pricePlanNames.PRICEPLAN1]: 0.26785 / 48 * 2,
            },
        ];

        const recommendation = recommend(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
            query: {
                limit: 2
            }
        });

        expect(recommendation).toEqual(expected);
    });

    it('should return last week usage',  () => {
        const { getReadings } = readings({
            [meters.METER0]: [
                {
                    "time": 1607686125,
                    "reading": 1.125796310571908
                },
                {
                    "time": 1607682525,
                    "reading": 1.059970250955348
                },
                {
                    "time": 1607678925,
                    "reading": 0.09530070007108948
                },
                {
                    "time": 1607675325,
                    "reading": 0.36312929344618317
                },
                {
                    "time": 1607671725,
                    "reading": 0.7627616561218362
                },
                {
                    "time": 1607668125,
                    "reading": 1.510838403112432
                },
                {
                    "time": 1607664525,
                    "reading": 1.0478148822424984
                },
                {
                    "time": 1607660925,
                    "reading": 0.5024752683705849
                },
                {
                    "time": 1607657325,
                    "reading": 1.209855881123954
                },
                {
                    "time": 1607653725,
                    "reading": 1.4539016192595264
                },
                {
                    "time": 1607650125,
                    "reading": 1.910331685330044
                },
                {
                    "time": 1607646525,
                    "reading": 1.2783515278640571
                },
                {
                    "time": 1607642925,
                    "reading": 1.593070891500914
                },
                {
                    "time": 1607639325,
                    "reading": 1.6430136505761581
                },
                {
                    "time": 1607635725,
                    "reading": 1.9702512971954231
                },
                {
                    "time": 1607632125,
                    "reading": 0.8668182497368266
                },
                {
                    "time": 1607628525,
                    "reading": 1.6716056533248707
                },
                {
                    "time": 1607624925,
                    "reading": 0.8074774410342229
                },
                {
                    "time": 1607621325,
                    "reading": 0.5870938240913905
                },
                {
                    "time": 1607617725,
                    "reading": 0.2529671305079044
                },
                {
                    "time": 1607614125,
                    "reading": 0.4392093005478568
                },
                {
                    "time": 1607610525,
                    "reading": 1.457629355407986
                },
                {
                    "time": 1607606925,
                    "reading": 1.5115905439600694
                },
                {
                    "time": 1607603325,
                    "reading": 1.1908011171190616
                },
                {
                    "time": 1607599725,
                    "reading": 0.6752815390661331
                },
                {
                    "time": 1607596125,
                    "reading": 0.022613954639145284
                },
                {
                    "time": 1607592525,
                    "reading": 1.0594594060342555
                },
                {
                    "time": 1607588925,
                    "reading": 1.5557790420529063
                },
                {
                    "time": 1607585325,
                    "reading": 0.23693451185101733
                },
                {
                    "time": 1607581725,
                    "reading": 0.5166572586809606
                },
                {
                    "time": 1607578125,
                    "reading": 1.5212310839181185
                },
                {
                    "time": 1607574525,
                    "reading": 0.11108387879311588
                },
                {
                    "time": 1607570925,
                    "reading": 1.2473605453620955
                },
                {
                    "time": 1607567325,
                    "reading": 1.456219475699342
                },
                {
                    "time": 1607563725,
                    "reading": 1.1595744356749456
                },
                {
                    "time": 1607560125,
                    "reading": 0.6391845940136549
                },
                {
                    "time": 1607556525,
                    "reading": 1.3573692813589489
                },
                {
                    "time": 1607552925,
                    "reading": 0.5850340635972962
                },
                {
                    "time": 1607549325,
                    "reading": 1.8511211980871005
                },
                {
                    "time": 1607545725,
                    "reading": 1.1492410200077092
                },
                {
                    "time": 1607542125,
                    "reading": 0.9571440270240661
                },
                {
                    "time": 1607538525,
                    "reading": 0.056379778946868075
                },
                {
                    "time": 1607534925,
                    "reading": 0.2906990875539992
                },
                {
                    "time": 1607531325,
                    "reading": 1.9700567407128893
                },
                {
                    "time": 1607527725,
                    "reading": 1.159191680604538
                },
                {
                    "time": 1607524125,
                    "reading": 0.1547907549927432
                },
                {
                    "time": 1607520525,
                    "reading": 1.8458469919451002
                },
                {
                    "time": 1607516925,
                    "reading": 0.17483780715681974
                },
                {
                    "time": 1607513325,
                    "reading": 0.893339761056879
                },
                {
                    "time": 1607509725,
                    "reading": 1.4507338679703632
                },
                {
                    "time": 1607506125,
                    "reading": 0.42687248931526556
                },
                {
                    "time": 1607502525,
                    "reading": 0.34656253764857325
                },
                {
                    "time": 1607498925,
                    "reading": 0.9020591765048649
                },
                {
                    "time": 1607495325,
                    "reading": 1.6324380783810426
                },
                {
                    "time": 1607491725,
                    "reading": 0.5365266568610698
                },
                {
                    "time": 1607488125,
                    "reading": 0.10019698045050296
                },
                {
                    "time": 1607484525,
                    "reading": 0.6904425771206046
                },
                {
                    "time": 1607480925,
                    "reading": 0.8797116616383827
                },
                {
                    "time": 1607477325,
                    "reading": 1.4598044325858148
                },
                {
                    "time": 1607473725,
                    "reading": 0.607802994129591
                },
                {
                    "time": 1607470125,
                    "reading": 1.4282181876224511
                },
                {
                    "time": 1607466525,
                    "reading": 0.9015361148861301
                },
                {
                    "time": 1607462925,
                    "reading": 1.3628700783909768
                },
                {
                    "time": 1607459325,
                    "reading": 1.4327484168577156
                },
                {
                    "time": 1607455725,
                    "reading": 0.09133322580715486
                },
                {
                    "time": 1607452125,
                    "reading": 0.3970251957033555
                },
                {
                    "time": 1607448525,
                    "reading": 0.9592090283047998
                },
                {
                    "time": 1607444925,
                    "reading": 1.143102610745467
                },
                {
                    "time": 1607441325,
                    "reading": 1.8254981052593187
                },
                {
                    "time": 1607437725,
                    "reading": 1.990931873377654
                },
                {
                    "time": 1607434125,
                    "reading": 1.8797087444889833
                },
                {
                    "time": 1607430525,
                    "reading": 1.4729990239999995
                },
                {
                    "time": 1607426925,
                    "reading": 1.96836202580789
                },
                {
                    "time": 1607423325,
                    "reading": 1.32897685225078
                },
                {
                    "time": 1607419725,
                    "reading": 0.7010507661198129
                },
                {
                    "time": 1607416125,
                    "reading": 1.1913264802241605
                },
                {
                    "time": 1607412525,
                    "reading": 1.1026798010774228
                },
                {
                    "time": 1607408925,
                    "reading": 1.2933038927842464
                },
                {
                    "time": 1607405325,
                    "reading": 0.058283373581273334
                },
                {
                    "time": 1607401725,
                    "reading": 1.9192043164185137
                },
                {
                    "time": 1607398125,
                    "reading": 0.26282735492534925
                },
                {
                    "time": 1607394525,
                    "reading": 1.7099626203282
                },
                {
                    "time": 1607390925,
                    "reading": 0.8983119816976344
                },
                {
                    "time": 1607387325,
                    "reading": 1.9842236841821501
                },
                {
                    "time": 1607383725,
                    "reading": 1.1323011218903534
                },
                {
                    "time": 1607380125,
                    "reading": 0.1352244581613995
                },
                {
                    "time": 1607376525,
                    "reading": 0.2107326047016489
                },
                {
                    "time": 1607372925,
                    "reading": 0.1369586234853859
                },
                {
                    "time": 1607369325,
                    "reading": 0.33581951401247023
                },
                {
                    "time": 1607365725,
                    "reading": 1.1624523845416461
                },
                {
                    "time": 1607362125,
                    "reading": 0.17678109611556803
                },
                {
                    "time": 1607358525,
                    "reading": 0.19578423667113087
                },
                {
                    "time": 1607354925,
                    "reading": 1.9207682557900263
                },
                {
                    "time": 1607351325,
                    "reading": 1.2288106545932242
                },
                {
                    "time": 1607347725,
                    "reading": 0.6437480998736622
                },
                {
                    "time": 1607344125,
                    "reading": 0.36952087319489824
                },
                {
                    "time": 1607340525,
                    "reading": 0.2975088015622531
                },
                {
                    "time": 1607336925,
                    "reading": 0.7762583289472076
                },
                {
                    "time": 1607333325,
                    "reading": 0.6788387481818883
                },
                {
                    "time": 1607329725,
                    "reading": 1.0994853312283124
                },
                {
                    "time": 1607326125,
                    "reading": 1.8451016456382403
                },
                {
                    "time": 1607322525,
                    "reading": 0.09107456658878332
                },
                {
                    "time": 1607318925,
                    "reading": 1.20174419725182
                },
                {
                    "time": 1607315325,
                    "reading": 0.27398364378030227
                },
                {
                    "time": 1607311725,
                    "reading": 1.2339225180415485
                },
                {
                    "time": 1607308125,
                    "reading": 0.5179827182358778
                },
                {
                    "time": 1607304525,
                    "reading": 0.660605321822763
                },
                {
                    "time": 1607300925,
                    "reading": 1.2552470475496156
                },
                {
                    "time": 1607297325,
                    "reading": 1.8691454188848757
                },
                {
                    "time": 1607293725,
                    "reading": 0.5092725891307812
                },
                {
                    "time": 1607290125,
                    "reading": 0.6026589603144825
                },
                {
                    "time": 1607286525,
                    "reading": 1.7383441501814958
                },
                {
                    "time": 1607282925,
                    "reading": 0.7906110198931402
                },
                {
                    "time": 1607279325,
                    "reading": 1.0039349153526014
                },
                {
                    "time": 1607275725,
                    "reading": 1.68360714818958
                },
                {
                    "time": 1607272125,
                    "reading": 0.06291541368851616
                },
                {
                    "time": 1607268525,
                    "reading": 0.5266741783399898
                },
                {
                    "time": 1607264925,
                    "reading": 1.370171282463899
                },
                {
                    "time": 1607261325,
                    "reading": 1.515626473394839
                },
                {
                    "time": 1607257725,
                    "reading": 0.199896921373806
                },
                {
                    "time": 1607254125,
                    "reading": 0.5021809598590363
                },
                {
                    "time": 1607250525,
                    "reading": 1.4776055560916874
                },
                {
                    "time": 1607246925,
                    "reading": 0.40598602459974087
                },
                {
                    "time": 1607243325,
                    "reading": 0.6428727774057923
                },
                {
                    "time": 1607239725,
                    "reading": 0.33063990988248504
                },
                {
                    "time": 1607236125,
                    "reading": 0.3582390153358901
                },
                {
                    "time": 1607232525,
                    "reading": 0.05467534201750279
                },
                {
                    "time": 1607228925,
                    "reading": 0.7583912110121624
                },
                {
                    "time": 1607225325,
                    "reading": 1.1135666283968608
                },
                {
                    "time": 1607221725,
                    "reading": 1.1410756281174033
                },
                {
                    "time": 1607218125,
                    "reading": 0.8875258985131245
                },
                {
                    "time": 1607214525,
                    "reading": 1.2396501276820944
                },
                {
                    "time": 1607210925,
                    "reading": 0.5942877858442563
                },
                {
                    "time": 1607207325,
                    "reading": 1.8719862076689329
                },
                {
                    "time": 1607203725,
                    "reading": 0.4865709820697641
                },
                {
                    "time": 1607200125,
                    "reading": 1.0770610198651562
                },
                {
                    "time": 1607196525,
                    "reading": 0.6196124486958974
                },
                {
                    "time": 1607192925,
                    "reading": 1.4577451907291685
                },
                {
                    "time": 1607189325,
                    "reading": 1.022449127427409
                },
                {
                    "time": 1607185725,
                    "reading": 0.538603421970278
                },
                {
                    "time": 1607182125,
                    "reading": 1.7408282989508326
                },
                {
                    "time": 1607178525,
                    "reading": 0.38210193328076114
                },
                {
                    "time": 1607174925,
                    "reading": 1.7343512063546038
                },
                {
                    "time": 1607171325,
                    "reading": 0.336671298427774
                },
                {
                    "time": 1607167725,
                    "reading": 0.6369649539095952
                },
                {
                    "time": 1607164125,
                    "reading": 1.19051096117821
                },
                {
                    "time": 1607160525,
                    "reading": 1.4026118464610797
                },
                {
                    "time": 1607156925,
                    "reading": 1.4070602952887414
                },
                {
                    "time": 1607153325,
                    "reading": 1.2356397153169936
                },
                {
                    "time": 1607149725,
                    "reading": 1.1947104212583257
                },
                {
                    "time": 1607146125,
                    "reading": 0.3832970185134097
                },
                {
                    "time": 1607142525,
                    "reading": 0.40410747598154373
                },
                {
                    "time": 1607138925,
                    "reading": 1.9036023478223556
                },
                {
                    "time": 1607135325,
                    "reading": 1.4739652841615523
                },
                {
                    "time": 1607131725,
                    "reading": 0.15147909184571562
                },
                {
                    "time": 1607128125,
                    "reading": 1.7791712996076288
                },
                {
                    "time": 1607124525,
                    "reading": 1.7764051144224355
                },
                {
                    "time": 1607120925,
                    "reading": 0.8033815380764526
                },
                {
                    "time": 1607117325,
                    "reading": 1.9401401261667788
                },
                {
                    "time": 1607113725,
                    "reading": 0.8265869536494481
                },
                {
                    "time": 1607110125,
                    "reading": 1.0352318483388943
                },
                {
                    "time": 1607106525,
                    "reading": 0.01038406426901295
                },
                {
                    "time": 1607102925,
                    "reading": 1.2514202948402913
                },
                {
                    "time": 1607099325,
                    "reading": 1.3974359218471921
                },
                {
                    "time": 1607095725,
                    "reading": 0.6111069589730604
                },
                {
                    "time": 1607092125,
                    "reading": 0.09032224808557121
                },
                {
                    "time": 1607088525,
                    "reading": 1.656609670944912
                },
                {
                    "time": 1607084925,
                    "reading": 0.7167824546178876
                }
            ],
        });

        const expected =
            {
                "smartMeterId": "smart-meter-0",
                "specificLastWeekUsage": 0.05802767758361635,
                "specificSupplier": "Dr Evil's Dark Energy"
            }
        ;

        const lastWeekUsage = getLastWeekUsageCost(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
        });

        expect(lastWeekUsage).toEqual(expected);
    });
});
